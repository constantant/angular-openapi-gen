import { InjectionToken, inject, FactoryProvider } from '@angular/core';
import { httpResource } from '@angular/common/http';
import type { paths } from '../schema.d';
import { GITHUB_BASE_URL } from '../api-base-url.token';

export type ReposListAttestationsParams =
  paths['/repos/{owner}/{repo}/attestations/{subject_digest}']['get']['parameters']['query'];

export type ReposListAttestationsResponse =
  paths['/repos/{owner}/{repo}/attestations/{subject_digest}']['get']['responses']['200']['content']['application/json'];

export const REPOS_LIST_ATTESTATIONS = new InjectionToken<
  (
    owner: string,
    repo: string,
    subjectDigest: string,
    params?:
      | ReposListAttestationsParams
      | (() => ReposListAttestationsParams | undefined),
  ) => ReturnType<typeof httpResource<ReposListAttestationsResponse>>
>('REPOS_LIST_ATTESTATIONS');

export function provideReposListAttestations(): FactoryProvider {
  return {
    provide: REPOS_LIST_ATTESTATIONS,
    useFactory: () => {
      const base = inject(GITHUB_BASE_URL);
      return (
        owner: string,
        repo: string,
        subjectDigest: string,
        params?:
          | ReposListAttestationsParams
          | (() => ReposListAttestationsParams | undefined),
      ) =>
        httpResource<ReposListAttestationsResponse>(() => ({
          url: `${base}/repos/${owner}/${repo}/attestations/${subjectDigest}`,
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
