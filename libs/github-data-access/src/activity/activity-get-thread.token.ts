import { InjectionToken, inject } from '@angular/core';
import { httpResource } from '@angular/common/http';
import type { paths } from '../schema.d';
import { GITHUB_BASE_URL } from '../api-base-url.token';

export type ActivityGetThreadResponse =
  paths['/notifications/threads/{thread_id}']['get']['responses']['200']['content']['application/json'];

export const ACTIVITY_GET_THREAD = new InjectionToken<
  (
    threadId: string,
  ) => ReturnType<typeof httpResource<ActivityGetThreadResponse>>
>('ACTIVITY_GET_THREAD', {
  providedIn: 'root',
  factory: () => {
    const base = inject(GITHUB_BASE_URL);
    return (threadId: string) =>
      httpResource<ActivityGetThreadResponse>(() => ({
        url: `${base}/notifications/threads/${threadId}`,
      }));
  },
});
