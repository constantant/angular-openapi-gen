import { InjectionToken, inject, Signal, FactoryProvider } from '@angular/core';
import { httpResource } from '@angular/common/http';
import { Validator, type Schema } from '@cfworker/json-schema';
import type { paths } from '../schema.d';
import { GITHUB_BASE_URL } from '../api-base-url.token';

export type UsersListAttestationsBulkBody = NonNullable<
  paths['/users/{username}/attestations/bulk-list']['post']['requestBody']
>['content']['application/json'];

export type UsersListAttestationsBulkResponse =
  paths['/users/{username}/attestations/bulk-list']['post']['responses']['200']['content']['application/json'];

const _responseSchema: Schema = {
  type: 'object',
  properties: {
    attestations_subject_digests: {
      type: 'object',
      additionalProperties: {
        type: ['array', 'null'],
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
              description: 'The bundle of the attestation.',
            },
            repository_id: {
              type: 'integer',
            },
            bundle_url: {
              type: 'string',
            },
          },
        },
      },
      description: 'Mapping of subject digest to bundles.',
    },
    page_info: {
      type: 'object',
      properties: {
        has_next: {
          type: 'boolean',
          description: 'Indicates whether there is a next page.',
        },
        has_previous: {
          type: 'boolean',
          description: 'Indicates whether there is a previous page.',
        },
        next: {
          type: 'string',
          description: 'The cursor to the next page.',
        },
        previous: {
          type: 'string',
          description: 'The cursor to the previous page.',
        },
      },
      description: 'Information about the current page.',
    },
  },
};

function _validateResponse(value: unknown): UsersListAttestationsBulkResponse {
  const _result = new Validator(_responseSchema).validate(value);
  if (!_result.valid) {
    throw new Error(
      `UsersListAttestationsBulk response failed schema validation: ${JSON.stringify(_result.errors)}`,
    );
  }
  return value as UsersListAttestationsBulkResponse;
}

export const USERS_LIST_ATTESTATIONS_BULK = new InjectionToken<
  (
    username: string,
    body: UsersListAttestationsBulkBody | Signal<UsersListAttestationsBulkBody>,
  ) => ReturnType<typeof httpResource<UsersListAttestationsBulkResponse>>
>('USERS_LIST_ATTESTATIONS_BULK');

export function provideUsersListAttestationsBulk(): FactoryProvider {
  return {
    provide: USERS_LIST_ATTESTATIONS_BULK,
    useFactory: () => {
      const base = inject(GITHUB_BASE_URL);
      return (
        username: string,
        body:
          UsersListAttestationsBulkBody | Signal<UsersListAttestationsBulkBody>,
      ) =>
        httpResource<UsersListAttestationsBulkResponse>(
          () => ({
            url: `${base}/users/${username}/attestations/bulk-list`,
            method: 'POST',
            body,
          }),
          { parse: _validateResponse },
        );
    },
  };
}
