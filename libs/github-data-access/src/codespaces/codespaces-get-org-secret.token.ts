import { InjectionToken, inject, FactoryProvider } from '@angular/core';
import { httpResource } from '@angular/common/http';
import type { paths } from '../schema.d';
import { GITHUB_BASE_URL } from '../api-base-url.token';

export type CodespacesGetOrgSecretResponse =
  paths['/orgs/{org}/codespaces/secrets/{secret_name}']['get']['responses']['200']['content']['application/json'];

export const CODESPACES_GET_ORG_SECRET = new InjectionToken<
  (
    org: string,
    secretName: string,
  ) => ReturnType<typeof httpResource<CodespacesGetOrgSecretResponse>>
>('CODESPACES_GET_ORG_SECRET');

export function provideCodespacesGetOrgSecret(): FactoryProvider {
  return {
    provide: CODESPACES_GET_ORG_SECRET,
    useFactory: () => {
      const base = inject(GITHUB_BASE_URL);
      return (org: string, secretName: string) =>
        httpResource<CodespacesGetOrgSecretResponse>(() => ({
          url: `${base}/orgs/${org}/codespaces/secrets/${secretName}`,
        }));
    },
  };
}
