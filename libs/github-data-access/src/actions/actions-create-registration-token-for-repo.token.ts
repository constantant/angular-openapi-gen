import { InjectionToken, inject } from '@angular/core';
import { httpResource } from '@angular/common/http';
import type { paths } from '../schema.d';
import { GITHUB_BASE_URL } from '../api-base-url.token';

export type ActionsCreateRegistrationTokenForRepoResponse =
  paths['/repos/{owner}/{repo}/actions/runners/registration-token']['post']['responses']['201']['content']['application/json'];

export const ACTIONS_CREATE_REGISTRATION_TOKEN_FOR_REPO = new InjectionToken<
  (
    owner: string,
    repo: string,
  ) => ReturnType<
    typeof httpResource<ActionsCreateRegistrationTokenForRepoResponse>
  >
>('ACTIONS_CREATE_REGISTRATION_TOKEN_FOR_REPO', {
  providedIn: 'root',
  factory: () => {
    const base = inject(GITHUB_BASE_URL);
    return (owner: string, repo: string) =>
      httpResource<ActionsCreateRegistrationTokenForRepoResponse>(() => ({
        url: `${base}/repos/${owner}/${repo}/actions/runners/registration-token`,
        method: 'POST',
      }));
  },
});
