import { InjectionToken, inject, FactoryProvider } from '@angular/core';
import { httpResource } from '@angular/common/http';
import type { paths } from '../schema.d';
import { GITHUB_BASE_URL } from '../api-base-url.token';

export const ACTIONS_DELETE_REPO_VARIABLE = new InjectionToken<
  (
    owner: string,
    repo: string,
    name: string,
  ) => ReturnType<typeof httpResource<unknown>>
>('ACTIONS_DELETE_REPO_VARIABLE');

export function provideActionsDeleteRepoVariable(): FactoryProvider {
  return {
    provide: ACTIONS_DELETE_REPO_VARIABLE,
    useFactory: () => {
      const base = inject(GITHUB_BASE_URL);
      return (owner: string, repo: string, name: string) =>
        httpResource<unknown>(() => ({
          url: `${base}/repos/${owner}/${repo}/actions/variables/${name}`,
          method: 'DELETE',
        }));
    },
  };
}
