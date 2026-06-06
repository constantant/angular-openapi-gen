import { InjectionToken, inject, Signal } from '@angular/core';
import { httpResource } from '@angular/common/http';
import type { paths } from '../schema.d';
import { GITHUB_BASE_URL } from '../api-base-url.token';

export type AgentsCreateOrUpdateRepoSecretBody = NonNullable<
  paths['/repos/{owner}/{repo}/agents/secrets/{secret_name}']['put']['requestBody']
>['content']['application/json'];

export type AgentsCreateOrUpdateRepoSecretResponse =
  paths['/repos/{owner}/{repo}/agents/secrets/{secret_name}']['put']['responses']['201']['content']['application/json'];

export const AGENTS_CREATE_OR_UPDATE_REPO_SECRET = new InjectionToken<
  (
    owner: string,
    repo: string,
    secretName: string,
    body:
      | AgentsCreateOrUpdateRepoSecretBody
      | Signal<AgentsCreateOrUpdateRepoSecretBody>,
  ) => ReturnType<typeof httpResource<AgentsCreateOrUpdateRepoSecretResponse>>
>('AGENTS_CREATE_OR_UPDATE_REPO_SECRET', {
  providedIn: 'root',
  factory: () => {
    const base = inject(GITHUB_BASE_URL);
    return (
      owner: string,
      repo: string,
      secretName: string,
      body:
        | AgentsCreateOrUpdateRepoSecretBody
        | Signal<AgentsCreateOrUpdateRepoSecretBody>,
    ) =>
      httpResource<AgentsCreateOrUpdateRepoSecretResponse>(() => ({
        url: `${base}/repos/${owner}/${repo}/agents/secrets/${secretName}`,
        method: 'PUT',
        body,
      }));
  },
});
