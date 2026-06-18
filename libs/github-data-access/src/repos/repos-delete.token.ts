import { InjectionToken, inject, FactoryProvider } from '@angular/core';
import { httpResource } from '@angular/common/http';
import type { paths } from '../schema.d';
import { GITHUB_BASE_URL } from '../api-base-url.token';

export type ReposDeleteError =
  | paths['/repos/{owner}/{repo}']['delete']['responses']['403']['content']['application/json']
  | paths['/repos/{owner}/{repo}']['delete']['responses']['404']['content']['application/json']
  | paths['/repos/{owner}/{repo}']['delete']['responses']['409']['content']['application/json'];

export const REPOS_DELETE = new InjectionToken<
  (owner: string, repo: string) => ReturnType<typeof httpResource<unknown>>
>('REPOS_DELETE');

export function provideReposDelete(): FactoryProvider {
  return {
    provide: REPOS_DELETE,
    useFactory: () => {
      const base = inject(GITHUB_BASE_URL);
      return (owner: string, repo: string) =>
        httpResource<unknown>(() => ({
          url: `${base}/repos/${owner}/${repo}`,
          method: 'DELETE',
        }));
    },
  };
}
