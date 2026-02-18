import { Redis } from '@upstash/redis';

const redis = Redis.fromEnv();

export async function POST(request: Request) {
  // Only process in production
  if (process.env.NODE_ENV !== 'production') {
    return Response.json({ visits: 0 });
  }

  try {
    const { searchParams } = new URL(request.url);
    const subject = searchParams.get('subject');
    const output = searchParams.get('output');

    if (!subject || !output) {
      return Response.json(
        { error: 'Missing subject or output parameter' },
        { status: 400 },
      );
    }

    const key = `visits:${subject}:${output}`;
    const visits = await redis.incr(key);

    return Response.json({ visits });
  } catch (error) {
    console.error('Failed to track visit:', error);
    return Response.json(
      { error: 'Failed to track visit' },
      { status: 500 },
    );
  }
}
