import { InjectionToken, inject, FactoryProvider } from '@angular/core';
import { httpResource } from '@angular/common/http';
import type { paths } from '../schema.d';
import { GITHUB_BASE_URL } from '../api-base-url.token';

export const REACTIONS_DELETE_FOR_ISSUE = new InjectionToken<
  (
    owner: string,
    repo: string,
    issueNumber: string,
    reactionId: string,
  ) => ReturnType<typeof httpResource<unknown>>
>('REACTIONS_DELETE_FOR_ISSUE');

export function provideReactionsDeleteForIssue(): FactoryProvider {
  return {
    provide: REACTIONS_DELETE_FOR_ISSUE,
    useFactory: () => {
      const base = inject(GITHUB_BASE_URL);
      return (
        owner: string,
        repo: string,
        issueNumber: string,
        reactionId: string,
      ) =>
        httpResource<unknown>(() => ({
          url: `${base}/repos/${owner}/${repo}/issues/${issueNumber}/reactions/${reactionId}`,
          method: 'DELETE',
        }));
    },
  };
}
