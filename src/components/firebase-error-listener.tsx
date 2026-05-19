'use client';

import { useEffect } from 'react';
import { errorEmitter } from '@/firebase/error-emitter';
import { useToast } from '@/hooks/use-toast';

export function FirebaseErrorListener() {
  const { toast } = useToast();

  useEffect(() => {
    const handlePermissionError = (error: any) => {
      // In production, we log to a service, in dev we show a toast or throw for the overlay
      if (process.env.NODE_ENV === 'development') {
        toast({
          variant: 'destructive',
          title: 'Permission Denied',
          description: error.message,
        });
        // We throw to trigger the Next.js error overlay in development
        throw error;
      } else {
        console.error('[Firebase Error]', error.message);
      }
    };

    errorEmitter.on('permission-error', handlePermissionError);
    return () => {
      errorEmitter.removeListener('permission-error', handlePermissionError);
    };
  }, [toast]);

  return null;
}
