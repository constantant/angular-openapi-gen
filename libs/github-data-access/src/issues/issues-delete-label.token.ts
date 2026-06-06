import { InjectionToken, inject, FactoryProvider } from '@angular/core';
import { httpResource } from '@angular/common/http';
import type { paths } from '../schema.d';
import { GITHUB_BASE_URL } from '../api-base-url.token';

export const ISSUES_DELETE_LABEL = new InjectionToken<
  (
    owner: string,
    repo: string,
    name: string,
  ) => ReturnType<typeof httpResource<unknown>>
>('ISSUES_DELETE_LABEL');

export function provideIssuesDeleteLabel(): FactoryProvider {
  return {
    provide: ISSUES_DELETE_LABEL,
    useFactory: () => {
      const base = inject(GITHUB_BASE_URL);
      return (owner: string, repo: string, name: string) =>
        httpResource<unknown>(() => ({
          url: `${base}/repos/${owner}/${repo}/labels/${name}`,
          method: 'DELETE',
        }));
    },
  };
}
