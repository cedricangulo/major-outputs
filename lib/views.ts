import { Redis } from '@upstash/redis';

const redis = Redis.fromEnv();

/**
 * Get the current visit count for an output
 */
export async function getVisitCount(
  subject: string,
  output: string,
): Promise<number> {
  try {
    const key = `visits:${subject}:${output}`;
    const count = await redis.get<number>(key);
    return count ?? 0;
  } catch (error) {
    console.error('Failed to fetch visit count:', error);
    return 0;
  }
}

/**
 * Format visit count for display
 */
export function formatVisitCount(count: number): string {
  return count === 1 ? '1 visit' : `${count} visits`;
}
