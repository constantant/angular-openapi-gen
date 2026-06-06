import { InjectionToken, inject, Signal } from '@angular/core';
import { httpResource } from '@angular/common/http';
import type { paths } from '../schema.d';
import { GITHUB_BASE_URL } from '../api-base-url.token';

export type DependabotCreateOrUpdateRepoSecretBody = NonNullable<
  paths['/repos/{owner}/{repo}/dependabot/secrets/{secret_name}']['put']['requestBody']
>['content']['application/json'];

export type DependabotCreateOrUpdateRepoSecretResponse =
  paths['/repos/{owner}/{repo}/dependabot/secrets/{secret_name}']['put']['responses']['201']['content']['application/json'];

export const DEPENDABOT_CREATE_OR_UPDATE_REPO_SECRET = new InjectionToken<
  (
    owner: string,
    repo: string,
    secretName: string,
    body:
      | DependabotCreateOrUpdateRepoSecretBody
      | Signal<DependabotCreateOrUpdateRepoSecretBody>,
  ) => ReturnType<
    typeof httpResource<DependabotCreateOrUpdateRepoSecretResponse>
  >
>('DEPENDABOT_CREATE_OR_UPDATE_REPO_SECRET', {
  providedIn: 'root',
  factory: () => {
    const base = inject(GITHUB_BASE_URL);
    return (
      owner: string,
      repo: string,
      secretName: string,
      body:
        | DependabotCreateOrUpdateRepoSecretBody
        | Signal<DependabotCreateOrUpdateRepoSecretBody>,
    ) =>
      httpResource<DependabotCreateOrUpdateRepoSecretResponse>(() => ({
        url: `${base}/repos/${owner}/${repo}/dependabot/secrets/${secretName}`,
        method: 'PUT',
        body,
      }));
  },
});
