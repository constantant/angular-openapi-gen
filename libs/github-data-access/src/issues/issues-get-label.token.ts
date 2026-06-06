import { InjectionToken, inject, FactoryProvider } from '@angular/core';
import { httpResource } from '@angular/common/http';
import type { paths } from '../schema.d';
import { GITHUB_BASE_URL } from '../api-base-url.token';

export type IssuesGetLabelResponse =
  paths['/repos/{owner}/{repo}/labels/{name}']['get']['responses']['200']['content']['application/json'];

export const ISSUES_GET_LABEL = new InjectionToken<
  (
    owner: string,
    repo: string,
    name: string,
  ) => ReturnType<typeof httpResource<IssuesGetLabelResponse>>
>('ISSUES_GET_LABEL');

export function provideIssuesGetLabel(): FactoryProvider {
  return {
    provide: ISSUES_GET_LABEL,
    useFactory: () => {
      const base = inject(GITHUB_BASE_URL);
      return (owner: string, repo: string, name: string) =>
        httpResource<IssuesGetLabelResponse>(() => ({
          url: `${base}/repos/${owner}/${repo}/labels/${name}`,
        }));
    },
  };
}
