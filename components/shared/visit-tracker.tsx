'use client';

import { Eye } from 'lucide-react';
import { useEffect } from 'react';

import { cn } from '@/lib/utils';

interface VisitTrackerProps {
  subject: string;
  output: string;
  initialCount: number;
  className?: string;
}

export function VisitTracker({
  subject,
  output,
  initialCount,
  className,
}: VisitTrackerProps) {
  useEffect(() => {
    fetch(`/api/track-visits?subject=${encodeURIComponent(subject)}&output=${encodeURIComponent(output)}`, {
      method: 'POST',
    }).catch((error) => {
      console.error('Failed to track visit:', error);
    });
  }, [subject, output]);

  const visitText = initialCount === 1 ? '1 visit' : `${initialCount} visits`;
  const classes = cn(
    'flex items-center gap-2 text-sm text-muted-foreground',
    className,
  );

  return (
    <div className={classes}>
      <Eye className="size-4" />
      <span>{visitText}</span>
    </div>
  );
}
