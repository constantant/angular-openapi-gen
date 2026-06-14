import { InjectionToken, inject, FactoryProvider } from '@angular/core';
import { httpResource } from '@angular/common/http';
import type { paths } from '../schema.d';
import { GITHUB_BASE_URL } from '../api-base-url.token';

export const ACTIONS_DELETE_ARTIFACT = new InjectionToken<
  (
    owner: string,
    repo: string,
    artifactId: string,
  ) => ReturnType<typeof httpResource<unknown>>
>('ACTIONS_DELETE_ARTIFACT');

export function provideActionsDeleteArtifact(): FactoryProvider {
  return {
    provide: ACTIONS_DELETE_ARTIFACT,
    useFactory: () => {
      const base = inject(GITHUB_BASE_URL);
      return (owner: string, repo: string, artifactId: string) =>
        httpResource<unknown>(() => ({
          url: `${base}/repos/${owner}/${repo}/actions/artifacts/${artifactId}`,
          method: 'DELETE',
        }));
    },
  };
}
