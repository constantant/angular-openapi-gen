import { InjectionToken, inject, FactoryProvider } from '@angular/core';
import { httpResource } from '@angular/common/http';
import type { paths } from '../schema.d';
import { GITHUB_BASE_URL } from '../api-base-url.token';

export type ActionsGetOrgPublicKeyResponse =
  paths['/orgs/{org}/actions/secrets/public-key']['get']['responses']['200']['content']['application/json'];

export const ACTIONS_GET_ORG_PUBLIC_KEY = new InjectionToken<
  (
    org: string,
  ) => ReturnType<typeof httpResource<ActionsGetOrgPublicKeyResponse>>
>('ACTIONS_GET_ORG_PUBLIC_KEY');

export function provideActionsGetOrgPublicKey(): FactoryProvider {
  return {
    provide: ACTIONS_GET_ORG_PUBLIC_KEY,
    useFactory: () => {
      const base = inject(GITHUB_BASE_URL);
      return (org: string) =>
        httpResource<ActionsGetOrgPublicKeyResponse>(() => ({
          url: `${base}/orgs/${org}/actions/secrets/public-key`,
        }));
    },
  };
}
