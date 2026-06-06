import { InjectionToken, inject } from '@angular/core';
import { httpResource } from '@angular/common/http';
import type { paths } from '../schema.d';
import { GITHUB_BASE_URL } from '../api-base-url.token';

export const ACTIVITY_DELETE_THREAD_SUBSCRIPTION = new InjectionToken<
  (threadId: string) => ReturnType<typeof httpResource<unknown>>
>('ACTIVITY_DELETE_THREAD_SUBSCRIPTION', {
  providedIn: 'root',
  factory: () => {
    const base = inject(GITHUB_BASE_URL);
    return (threadId: string) =>
      httpResource<unknown>(() => ({
        url: `${base}/notifications/threads/${threadId}/subscription`,
        method: 'DELETE',
      }));
  },
});
