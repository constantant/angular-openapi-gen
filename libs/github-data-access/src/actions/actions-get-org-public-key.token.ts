import { InjectionToken, inject } from '@angular/core';
import { httpResource } from '@angular/common/http';
import type { paths } from '../schema.d';
import { GITHUB_BASE_URL } from '../api-base-url.token';

export type ActionsGetOrgPublicKeyResponse =
  paths['/orgs/{org}/actions/secrets/public-key']['get']['responses']['200']['content']['application/json'];

export const ACTIONS_GET_ORG_PUBLIC_KEY = new InjectionToken<
  (
    org: string,
  ) => ReturnType<typeof httpResource<ActionsGetOrgPublicKeyResponse>>
>('ACTIONS_GET_ORG_PUBLIC_KEY', {
  providedIn: 'root',
  factory: () => {
    const base = inject(GITHUB_BASE_URL);
    return (org: string) =>
      httpResource<ActionsGetOrgPublicKeyResponse>(() => ({
        url: `${base}/orgs/${org}/actions/secrets/public-key`,
      }));
  },
});
