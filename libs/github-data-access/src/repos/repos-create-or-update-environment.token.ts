import { InjectionToken, inject, Signal } from '@angular/core';
import { httpResource } from '@angular/common/http';
import type { paths } from '../schema.d';
import { GITHUB_BASE_URL } from '../api-base-url.token';

type ReposCreateOrUpdateEnvironmentBody = NonNullable<
  paths['/repos/{owner}/{repo}/environments/{environment_name}']['put']['requestBody']
>['content']['application/json'];

type ReposCreateOrUpdateEnvironmentResponse =
  paths['/repos/{owner}/{repo}/environments/{environment_name}']['put']['responses']['200']['content']['application/json'];

export const REPOS_CREATE_OR_UPDATE_ENVIRONMENT = new InjectionToken<
  (
    owner: string,
    repo: string,
    environment_name: string,
    body:
      | ReposCreateOrUpdateEnvironmentBody
      | Signal<ReposCreateOrUpdateEnvironmentBody>,
  ) => ReturnType<typeof httpResource<ReposCreateOrUpdateEnvironmentResponse>>
>('REPOS_CREATE_OR_UPDATE_ENVIRONMENT', {
  providedIn: 'root',
  factory: () => {
    const base = inject(GITHUB_BASE_URL);
    return (
      owner: string,
      repo: string,
      environment_name: string,
      body:
        | ReposCreateOrUpdateEnvironmentBody
        | Signal<ReposCreateOrUpdateEnvironmentBody>,
    ) =>
      httpResource<ReposCreateOrUpdateEnvironmentResponse>(() => ({
        url: `${base}/repos/${owner}/${repo}/environments/${environment_name}`,
        method: 'PUT',
        body,
      }));
  },
});
