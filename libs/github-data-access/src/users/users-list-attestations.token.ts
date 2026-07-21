import { InjectionToken, inject, FactoryProvider } from '@angular/core';
import { httpResource } from '@angular/common/http';
import { Validator, type Schema } from '@cfworker/json-schema';
import type { paths } from '../schema.d';
import { GITHUB_BASE_URL } from '../api-base-url.token';

export type UsersListAttestationsParams =
  paths['/users/{username}/attestations/{subject_digest}']['get']['parameters']['query'];

export type UsersListAttestationsResponse =
  | paths['/users/{username}/attestations/{subject_digest}']['get']['responses']['200']['content']['application/json']
  | paths['/users/{username}/attestations/{subject_digest}']['get']['responses']['201']['content']['application/json'];

export type UsersListAttestationsError =
  paths['/users/{username}/attestations/{subject_digest}']['get']['responses']['404']['content']['application/json'];

const _responseSchema: Schema = {
  type: 'object',
  properties: {
    attestations: {
      type: 'array',
      items: {
        type: 'object',
        properties: {
          bundle: {
            type: 'object',
            properties: {
              mediaType: {
                type: 'string',
              },
              verificationMaterial: {
                type: 'object',
                properties: {},
                additionalProperties: true,
              },
              dsseEnvelope: {
                type: 'object',
                properties: {},
                additionalProperties: true,
              },
            },
            description:
              "The attestation's Sigstore Bundle.\nRefer to the [Sigstore Bundle Specification](https://github.com/sigstore/protobuf-specs/blob/main/protos/sigstore_bundle.proto) for more information.",
          },
          repository_id: {
            type: 'integer',
          },
          bundle_url: {
            type: 'string',
          },
          initiator: {
            type: 'string',
          },
        },
      },
    },
  },
};

function _validateResponse(value: unknown): UsersListAttestationsResponse {
  const _result = new Validator(_responseSchema).validate(value);
  if (!_result.valid) {
    throw new Error(
      `UsersListAttestations response failed schema validation: ${JSON.stringify(_result.errors)}`,
    );
  }
  return value as UsersListAttestationsResponse;
}

export const USERS_LIST_ATTESTATIONS = new InjectionToken<
  (
    username: string,
    subjectDigest: string,
    params?:
      | UsersListAttestationsParams
      | (() => UsersListAttestationsParams | undefined),
  ) => ReturnType<typeof httpResource<UsersListAttestationsResponse>>
>('USERS_LIST_ATTESTATIONS');

export function provideUsersListAttestations(): FactoryProvider {
  return {
    provide: USERS_LIST_ATTESTATIONS,
    useFactory: () => {
      const base = inject(GITHUB_BASE_URL);
      return (
        username: string,
        subjectDigest: string,
        params?:
          | UsersListAttestationsParams
          | (() => UsersListAttestationsParams | undefined),
      ) =>
        httpResource<UsersListAttestationsResponse>(
          () => {
            const _params = typeof params === 'function' ? params() : params;
            if (typeof params === 'function' && _params === undefined)
              return undefined;
            return {
              url: `${base}/users/${username}/attestations/${subjectDigest}`,
              params: _params as unknown as Record<
                string,
                | string
                | number
                | boolean
                | readonly (string | number | boolean)[]
              >,
            };
          },
          { parse: _validateResponse },
        );
    },
  };
}
