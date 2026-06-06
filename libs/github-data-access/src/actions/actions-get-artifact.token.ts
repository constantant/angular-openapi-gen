import { InjectionToken, inject, FactoryProvider } from '@angular/core';
import { httpResource } from '@angular/common/http';
import type { paths } from '../schema.d';
import { GITHUB_BASE_URL } from '../api-base-url.token';

export type ActionsGetArtifactResponse =
  paths['/repos/{owner}/{repo}/actions/artifacts/{artifact_id}']['get']['responses']['200']['content']['application/json'];

export const ACTIONS_GET_ARTIFACT = new InjectionToken<
  (
    owner: string,
    repo: string,
    artifactId: string,
  ) => ReturnType<typeof httpResource<ActionsGetArtifactResponse>>
>('ACTIONS_GET_ARTIFACT');

export function provideActionsGetArtifact(): FactoryProvider {
  return {
    provide: ACTIONS_GET_ARTIFACT,
    useFactory: () => {
      const base = inject(GITHUB_BASE_URL);
      return (owner: string, repo: string, artifactId: string) =>
        httpResource<ActionsGetArtifactResponse>(() => ({
          url: `${base}/repos/${owner}/${repo}/actions/artifacts/${artifactId}`,
        }));
    },
  };
}
