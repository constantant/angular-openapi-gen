import { InjectionToken, inject, FactoryProvider } from '@angular/core';
import { httpResource } from '@angular/common/http';
import type { paths } from '../schema.d';
import { GITHUB_BASE_URL } from '../api-base-url.token';

export type OrgsListAttestationRepositoriesParams =
  paths['/orgs/{org}/attestations/repositories']['get']['parameters']['query'];

export type OrgsListAttestationRepositoriesResponse =
  paths['/orgs/{org}/attestations/repositories']['get']['responses']['200']['content']['application/json'];

export const ORGS_LIST_ATTESTATION_REPOSITORIES = new InjectionToken<
  (
    org: string,
    params?:
      | OrgsListAttestationRepositoriesParams
      | (() => OrgsListAttestationRepositoriesParams | undefined),
  ) => ReturnType<typeof httpResource<OrgsListAttestationRepositoriesResponse>>
>('ORGS_LIST_ATTESTATION_REPOSITORIES');

export function provideOrgsListAttestationRepositories(): FactoryProvider {
  return {
    provide: ORGS_LIST_ATTESTATION_REPOSITORIES,
    useFactory: () => {
      const base = inject(GITHUB_BASE_URL);
      return (
        org: string,
        params?:
          | OrgsListAttestationRepositoriesParams
          | (() => OrgsListAttestationRepositoriesParams | undefined),
      ) =>
        httpResource<OrgsListAttestationRepositoriesResponse>(() => ({
          url: `${base}/orgs/${org}/attestations/repositories`,
          params: (typeof params === 'function'
            ? params()
            : params) as unknown as Record<
            string,
            string | number | boolean | readonly (string | number | boolean)[]
          >,
        }));
    },
  };
}
