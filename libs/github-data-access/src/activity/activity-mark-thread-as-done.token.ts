import { InjectionToken, inject, FactoryProvider } from '@angular/core';
import { httpResource } from '@angular/common/http';
import type { paths } from '../schema.d';
import { GITHUB_BASE_URL } from '../api-base-url.token';

export const ACTIVITY_MARK_THREAD_AS_DONE = new InjectionToken<
  (threadId: string) => ReturnType<typeof httpResource<unknown>>
>('ACTIVITY_MARK_THREAD_AS_DONE');

export function provideActivityMarkThreadAsDone(): FactoryProvider {
  return {
    provide: ACTIVITY_MARK_THREAD_AS_DONE,
    useFactory: () => {
      const base = inject(GITHUB_BASE_URL);
      return (threadId: string) =>
        httpResource<unknown>(() => ({
          url: `${base}/notifications/threads/${threadId}`,
          method: 'DELETE',
        }));
    },
  };
}
