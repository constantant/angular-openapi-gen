import { InjectionToken, inject } from '@angular/core';
import { httpResource } from '@angular/common/http';
import type { paths } from '../schema.d';
import { GITHUB_BASE_URL } from '../api-base-url.token';

export type DependabotGetOrgSecretResponse =
  paths['/orgs/{org}/dependabot/secrets/{secret_name}']['get']['responses']['200']['content']['application/json'];

export const DEPENDABOT_GET_ORG_SECRET = new InjectionToken<
  (
    org: string,
    secretName: string,
  ) => ReturnType<typeof httpResource<DependabotGetOrgSecretResponse>>
>('DEPENDABOT_GET_ORG_SECRET', {
  providedIn: 'root',
  factory: () => {
    const base = inject(GITHUB_BASE_URL);
    return (org: string, secretName: string) =>
      httpResource<DependabotGetOrgSecretResponse>(() => ({
        url: `${base}/orgs/${org}/dependabot/secrets/${secretName}`,
      }));
  },
});
