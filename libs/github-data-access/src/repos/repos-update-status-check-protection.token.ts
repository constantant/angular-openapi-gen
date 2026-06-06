import { InjectionToken, inject, Signal } from '@angular/core';
import { httpResource } from '@angular/common/http';
import type { paths } from '../schema.d';
import { GITHUB_BASE_URL } from '../api-base-url.token';

type ReposUpdateStatusCheckProtectionBody = NonNullable<
  paths['/repos/{owner}/{repo}/branches/{branch}/protection/required_status_checks']['patch']['requestBody']
>['content']['application/json'];

type ReposUpdateStatusCheckProtectionResponse =
  paths['/repos/{owner}/{repo}/branches/{branch}/protection/required_status_checks']['patch']['responses']['200']['content']['application/json'];

export const REPOS_UPDATE_STATUS_CHECK_PROTECTION = new InjectionToken<
  (
    owner: string,
    repo: string,
    branch: string,
    body:
      | ReposUpdateStatusCheckProtectionBody
      | Signal<ReposUpdateStatusCheckProtectionBody>,
  ) => ReturnType<typeof httpResource<ReposUpdateStatusCheckProtectionResponse>>
>('REPOS_UPDATE_STATUS_CHECK_PROTECTION', {
  providedIn: 'root',
  factory: () => {
    const base = inject(GITHUB_BASE_URL);
    return (
      owner: string,
      repo: string,
      branch: string,
      body:
        | ReposUpdateStatusCheckProtectionBody
        | Signal<ReposUpdateStatusCheckProtectionBody>,
    ) =>
      httpResource<ReposUpdateStatusCheckProtectionResponse>(() => ({
        url: `${base}/repos/${owner}/${repo}/branches/${branch}/protection/required_status_checks`,
        method: 'PATCH',
        body,
      }));
  },
});
