import { InjectionToken, inject, FactoryProvider } from '@angular/core';
import { httpResource } from '@angular/common/http';
import type { paths } from '../schema.d';
import { GITHUB_BASE_URL } from '../api-base-url.token';

export type DependabotGetOrgPublicKeyResponse =
  paths['/orgs/{org}/dependabot/secrets/public-key']['get']['responses']['200']['content']['application/json'];

export const DEPENDABOT_GET_ORG_PUBLIC_KEY = new InjectionToken<
  (
    org: string,
  ) => ReturnType<typeof httpResource<DependabotGetOrgPublicKeyResponse>>
>('DEPENDABOT_GET_ORG_PUBLIC_KEY');

export function provideDependabotGetOrgPublicKey(): FactoryProvider {
  return {
    provide: DEPENDABOT_GET_ORG_PUBLIC_KEY,
    useFactory: () => {
      const base = inject(GITHUB_BASE_URL);
      return (org: string) =>
        httpResource<DependabotGetOrgPublicKeyResponse>(() => ({
          url: `${base}/orgs/${org}/dependabot/secrets/public-key`,
        }));
    },
  };
}
