import { InjectionToken, inject, FactoryProvider } from '@angular/core';
import { httpResource } from '@angular/common/http';
import type { paths } from '../schema.d';
import { GITHUB_BASE_URL } from '../api-base-url.token';

export const REACTIONS_DELETE_FOR_RELEASE = new InjectionToken<
  (
    owner: string,
    repo: string,
    releaseId: string,
    reactionId: string,
  ) => ReturnType<typeof httpResource<unknown>>
>('REACTIONS_DELETE_FOR_RELEASE');

export function provideReactionsDeleteForRelease(): FactoryProvider {
  return {
    provide: REACTIONS_DELETE_FOR_RELEASE,
    useFactory: () => {
      const base = inject(GITHUB_BASE_URL);
      return (
        owner: string,
        repo: string,
        releaseId: string,
        reactionId: string,
      ) =>
        httpResource<unknown>(() => ({
          url: `${base}/repos/${owner}/${repo}/releases/${releaseId}/reactions/${reactionId}`,
          method: 'DELETE',
        }));
    },
  };
}
