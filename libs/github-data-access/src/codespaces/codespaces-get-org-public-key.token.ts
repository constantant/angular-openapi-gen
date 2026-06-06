import { InjectionToken, inject, FactoryProvider } from '@angular/core';
import { httpResource } from '@angular/common/http';
import type { paths } from '../schema.d';
import { GITHUB_BASE_URL } from '../api-base-url.token';

export type CodespacesGetOrgPublicKeyResponse =
  paths['/orgs/{org}/codespaces/secrets/public-key']['get']['responses']['200']['content']['application/json'];

export const CODESPACES_GET_ORG_PUBLIC_KEY = new InjectionToken<
  (
    org: string,
  ) => ReturnType<typeof httpResource<CodespacesGetOrgPublicKeyResponse>>
>('CODESPACES_GET_ORG_PUBLIC_KEY');

export function provideCodespacesGetOrgPublicKey(): FactoryProvider {
  return {
    provide: CODESPACES_GET_ORG_PUBLIC_KEY,
    useFactory: () => {
      const base = inject(GITHUB_BASE_URL);
      return (org: string) =>
        httpResource<CodespacesGetOrgPublicKeyResponse>(() => ({
          url: `${base}/orgs/${org}/codespaces/secrets/public-key`,
        }));
    },
  };
}
