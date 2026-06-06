import { InjectionToken, inject } from '@angular/core';
import { httpResource } from '@angular/common/http';
import type { paths } from '../schema.d';
import { GITHUB_BASE_URL } from '../api-base-url.token';

type ReposListAttestationsParams =
  paths['/repos/{owner}/{repo}/attestations/{subject_digest}']['get']['parameters']['query'];

type ReposListAttestationsResponse =
  paths['/repos/{owner}/{repo}/attestations/{subject_digest}']['get']['responses']['200']['content']['application/json'];

export const REPOS_LIST_ATTESTATIONS = new InjectionToken<
  (
    owner: string,
    repo: string,
    subject_digest: string,
    params?: ReposListAttestationsParams,
  ) => ReturnType<typeof httpResource<ReposListAttestationsResponse>>
>('REPOS_LIST_ATTESTATIONS', {
  providedIn: 'root',
  factory: () => {
    const base = inject(GITHUB_BASE_URL);
    return (
      owner: string,
      repo: string,
      subject_digest: string,
      params?: ReposListAttestationsParams,
    ) =>
      httpResource<ReposListAttestationsResponse>(() => ({
        url: `${base}/repos/${owner}/${repo}/attestations/${subject_digest}`,
        params: params as unknown as Record<
          string,
          string | number | boolean | readonly (string | number | boolean)[]
        >,
      }));
  },
});
