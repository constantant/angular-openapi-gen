import { InjectionToken, inject, FactoryProvider } from '@angular/core';
import { httpResource } from '@angular/common/http';
import type { paths } from '../schema.d';
import { GITHUB_BASE_URL } from '../api-base-url.token';

export const PRIVATE_REGISTRIES_DELETE_ORG_PRIVATE_REGISTRY =
  new InjectionToken<
    (
      org: string,
      secretName: string,
    ) => ReturnType<typeof httpResource<unknown>>
  >('PRIVATE_REGISTRIES_DELETE_ORG_PRIVATE_REGISTRY');

export function providePrivateRegistriesDeleteOrgPrivateRegistry(): FactoryProvider {
  return {
    provide: PRIVATE_REGISTRIES_DELETE_ORG_PRIVATE_REGISTRY,
    useFactory: () => {
      const base = inject(GITHUB_BASE_URL);
      return (org: string, secretName: string) =>
        httpResource<unknown>(() => ({
          url: `${base}/orgs/${org}/private-registries/${secretName}`,
          method: 'DELETE',
        }));
    },
  };
}
