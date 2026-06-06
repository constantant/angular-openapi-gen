import { InjectionToken, inject, FactoryProvider } from '@angular/core';
import { httpResource } from '@angular/common/http';
import type { paths } from '../schema.d';
import { GITHUB_BASE_URL } from '../api-base-url.token';

export const REPOS_REMOVE_COLLABORATOR = new InjectionToken<
  (
    owner: string,
    repo: string,
    username: string,
  ) => ReturnType<typeof httpResource<unknown>>
>('REPOS_REMOVE_COLLABORATOR');

export function provideReposRemoveCollaborator(): FactoryProvider {
  return {
    provide: REPOS_REMOVE_COLLABORATOR,
    useFactory: () => {
      const base = inject(GITHUB_BASE_URL);
      return (owner: string, repo: string, username: string) =>
        httpResource<unknown>(() => ({
          url: `${base}/repos/${owner}/${repo}/collaborators/${username}`,
          method: 'DELETE',
        }));
    },
  };
}
