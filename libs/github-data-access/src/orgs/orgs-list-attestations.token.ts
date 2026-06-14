import { InjectionToken, inject, FactoryProvider } from '@angular/core';
import { httpResource } from '@angular/common/http';
import type { paths } from '../schema.d';
import { GITHUB_BASE_URL } from '../api-base-url.token';

export type OrgsListAttestationsParams =
  paths['/orgs/{org}/attestations/{subject_digest}']['get']['parameters']['query'];

export type OrgsListAttestationsResponse =
  paths['/orgs/{org}/attestations/{subject_digest}']['get']['responses']['200']['content']['application/json'];

export const ORGS_LIST_ATTESTATIONS = new InjectionToken<
  (
    org: string,
    subjectDigest: string,
    params?:
      | OrgsListAttestationsParams
      | (() => OrgsListAttestationsParams | undefined),
  ) => ReturnType<typeof httpResource<OrgsListAttestationsResponse>>
>('ORGS_LIST_ATTESTATIONS');

export function provideOrgsListAttestations(): FactoryProvider {
  return {
    provide: ORGS_LIST_ATTESTATIONS,
    useFactory: () => {
      const base = inject(GITHUB_BASE_URL);
      return (
        org: string,
        subjectDigest: string,
        params?:
          | OrgsListAttestationsParams
          | (() => OrgsListAttestationsParams | undefined),
      ) =>
        httpResource<OrgsListAttestationsResponse>(() => {
          const _params = typeof params === 'function' ? params() : params;
          if (typeof params === 'function' && _params === undefined)
            return undefined;
          return {
            url: `${base}/orgs/${org}/attestations/${subjectDigest}`,
            params: _params as unknown as Record<
              string,
              string | number | boolean | readonly (string | number | boolean)[]
            >,
          };
        });
    },
  };
}
