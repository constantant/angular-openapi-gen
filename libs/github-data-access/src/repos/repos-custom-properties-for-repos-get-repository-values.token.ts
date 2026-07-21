import { InjectionToken, inject, FactoryProvider } from '@angular/core';
import { httpResource } from '@angular/common/http';
import { Validator, type Schema } from '@cfworker/json-schema';
import type { paths } from '../schema.d';
import { GITHUB_BASE_URL } from '../api-base-url.token';

export type ReposCustomPropertiesForReposGetRepositoryValuesResponse =
  paths['/repos/{owner}/{repo}/properties/values']['get']['responses']['200']['content']['application/json'];

export type ReposCustomPropertiesForReposGetRepositoryValuesError =
  | paths['/repos/{owner}/{repo}/properties/values']['get']['responses']['403']['content']['application/json']
  | paths['/repos/{owner}/{repo}/properties/values']['get']['responses']['404']['content']['application/json'];

const _responseSchema: Schema = {
  type: 'array',
  items: {
    title: 'Custom Property Value',
    description: 'Custom property name and associated value',
    type: 'object',
    properties: {
      property_name: {
        type: 'string',
        description: 'The name of the property',
      },
      value: {
        oneOf: [
          {
            type: 'string',
          },
          {
            type: 'array',
            items: {
              type: 'string',
            },
          },
        ],
        description: 'The value assigned to the property',
      },
    },
    required: ['property_name', 'value'],
  },
};

function _validateResponse(
  value: unknown,
): ReposCustomPropertiesForReposGetRepositoryValuesResponse {
  const _result = new Validator(_responseSchema).validate(value);
  if (!_result.valid) {
    throw new Error(
      `ReposCustomPropertiesForReposGetRepositoryValues response failed schema validation: ${JSON.stringify(_result.errors)}`,
    );
  }
  return value as ReposCustomPropertiesForReposGetRepositoryValuesResponse;
}

export const REPOS_CUSTOM_PROPERTIES_FOR_REPOS_GET_REPOSITORY_VALUES =
  new InjectionToken<
    (
      owner: string,
      repo: string,
    ) => ReturnType<
      typeof httpResource<ReposCustomPropertiesForReposGetRepositoryValuesResponse>
    >
  >('REPOS_CUSTOM_PROPERTIES_FOR_REPOS_GET_REPOSITORY_VALUES');

export function provideReposCustomPropertiesForReposGetRepositoryValues(): FactoryProvider {
  return {
    provide: REPOS_CUSTOM_PROPERTIES_FOR_REPOS_GET_REPOSITORY_VALUES,
    useFactory: () => {
      const base = inject(GITHUB_BASE_URL);
      return (owner: string, repo: string) =>
        httpResource<ReposCustomPropertiesForReposGetRepositoryValuesResponse>(
          () => ({
            url: `${base}/repos/${owner}/${repo}/properties/values`,
          }),
          { parse: _validateResponse },
        );
    },
  };
}
