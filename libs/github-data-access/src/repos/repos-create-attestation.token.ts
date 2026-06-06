import { InjectionToken, inject, Signal, FactoryProvider } from '@angular/core';
import { httpResource } from '@angular/common/http';
import type { paths } from '../schema.d';
import { GITHUB_BASE_URL } from '../api-base-url.token';

export type ReposCreateAttestationBody = NonNullable<
  paths['/repos/{owner}/{repo}/attestations']['post']['requestBody']
>['content']['application/json'];

export type ReposCreateAttestationResponse =
  paths['/repos/{owner}/{repo}/attestations']['post']['responses']['201']['content']['application/json'];

export const REPOS_CREATE_ATTESTATION = new InjectionToken<
  (
    owner: string,
    repo: string,
    body: ReposCreateAttestationBody | Signal<ReposCreateAttestationBody>,
  ) => ReturnType<typeof httpResource<ReposCreateAttestationResponse>>
>('REPOS_CREATE_ATTESTATION');

export function provideReposCreateAttestation(): FactoryProvider {
  return {
    provide: REPOS_CREATE_ATTESTATION,
    useFactory: () => {
      const base = inject(GITHUB_BASE_URL);
      return (
        owner: string,
        repo: string,
        body: ReposCreateAttestationBody | Signal<ReposCreateAttestationBody>,
      ) =>
        httpResource<ReposCreateAttestationResponse>(() => ({
          url: `${base}/repos/${owner}/${repo}/attestations`,
          method: 'POST',
          body,
        }));
    },
  };
}
