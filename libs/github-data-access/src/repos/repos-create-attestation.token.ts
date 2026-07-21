import { InjectionToken, inject, Signal, FactoryProvider } from '@angular/core';
import { httpResource } from '@angular/common/http';
import { Validator, type Schema } from '@cfworker/json-schema';
import type { paths } from '../schema.d';
import { GITHUB_BASE_URL } from '../api-base-url.token';

export type ReposCreateAttestationBody = NonNullable<
  paths['/repos/{owner}/{repo}/attestations']['post']['requestBody']
>['content']['application/json'];

export type ReposCreateAttestationResponse =
  paths['/repos/{owner}/{repo}/attestations']['post']['responses']['201']['content']['application/json'];

export type ReposCreateAttestationError =
  | paths['/repos/{owner}/{repo}/attestations']['post']['responses']['403']['content']['application/json']
  | paths['/repos/{owner}/{repo}/attestations']['post']['responses']['422']['content']['application/json'];

const _responseSchema: Schema = {
  type: 'object',
  properties: {
    id: {
      type: 'integer',
      description: 'The ID of the attestation.',
    },
  },
};

function _validateResponse(value: unknown): ReposCreateAttestationResponse {
  const _result = new Validator(_responseSchema).validate(value);
  if (!_result.valid) {
    throw new Error(
      `ReposCreateAttestation response failed schema validation: ${JSON.stringify(_result.errors)}`,
    );
  }
  return value as ReposCreateAttestationResponse;
}

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
        httpResource<ReposCreateAttestationResponse>(
          () => ({
            url: `${base}/repos/${owner}/${repo}/attestations`,
            method: 'POST',
            body,
          }),
          { parse: _validateResponse },
        );
    },
  };
}
