import { InjectionToken, inject, FactoryProvider } from '@angular/core';
import { httpResource } from '@angular/common/http';
import type { paths } from '../schema.d';
import { GITHUB_BASE_URL } from '../api-base-url.token';

export const ORGS_DELETE_ATTESTATIONS_BY_SUBJECT_DIGEST = new InjectionToken<
  (
    org: string,
    subjectDigest: string,
  ) => ReturnType<typeof httpResource<unknown>>
>('ORGS_DELETE_ATTESTATIONS_BY_SUBJECT_DIGEST');

export function provideOrgsDeleteAttestationsBySubjectDigest(): FactoryProvider {
  return {
    provide: ORGS_DELETE_ATTESTATIONS_BY_SUBJECT_DIGEST,
    useFactory: () => {
      const base = inject(GITHUB_BASE_URL);
      return (org: string, subjectDigest: string) =>
        httpResource<unknown>(() => ({
          url: `${base}/orgs/${org}/attestations/digest/${subjectDigest}`,
          method: 'DELETE',
        }));
    },
  };
}
