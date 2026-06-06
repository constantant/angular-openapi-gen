import { InjectionToken, inject } from '@angular/core';
import { httpResource } from '@angular/common/http';
import type { paths } from '../schema.d';
import { GITHUB_BASE_URL } from '../api-base-url.token';

export const ACTIVITY_MARK_THREAD_AS_READ = new InjectionToken<
  (threadId: string) => ReturnType<typeof httpResource<unknown>>
>('ACTIVITY_MARK_THREAD_AS_READ', {
  providedIn: 'root',
  factory: () => {
    const base = inject(GITHUB_BASE_URL);
    return (threadId: string) =>
      httpResource<unknown>(() => ({
        url: `${base}/notifications/threads/${threadId}`,
        method: 'PATCH',
      }));
  },
});
