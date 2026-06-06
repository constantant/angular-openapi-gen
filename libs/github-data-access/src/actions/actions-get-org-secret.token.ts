import { InjectionToken, inject } from '@angular/core';
import { httpResource } from '@angular/common/http';
import type { paths } from '../schema.d';
import { GITHUB_BASE_URL } from '../api-base-url.token';

export type ActionsGetOrgSecretResponse =
  paths['/orgs/{org}/actions/secrets/{secret_name}']['get']['responses']['200']['content']['application/json'];

export const ACTIONS_GET_ORG_SECRET = new InjectionToken<
  (
    org: string,
    secretName: string,
  ) => ReturnType<typeof httpResource<ActionsGetOrgSecretResponse>>
>('ACTIONS_GET_ORG_SECRET', {
  providedIn: 'root',
  factory: () => {
    const base = inject(GITHUB_BASE_URL);
    return (org: string, secretName: string) =>
      httpResource<ActionsGetOrgSecretResponse>(() => ({
        url: `${base}/orgs/${org}/actions/secrets/${secretName}`,
      }));
  },
});
