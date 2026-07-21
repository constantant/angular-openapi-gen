import { InjectionToken, inject, FactoryProvider } from '@angular/core';
import { httpResource } from '@angular/common/http';
import { Validator, type Schema } from '@cfworker/json-schema';
import type { paths } from '../schema.d';
import { GITHUB_BASE_URL } from '../api-base-url.token';

export type ReposCheckImmutableReleasesResponse =
  paths['/repos/{owner}/{repo}/immutable-releases']['get']['responses']['200']['content']['application/json'];

const _responseSchema: Schema = {
  title: 'Check immutable releases',
  description: 'Check immutable releases',
  type: 'object',
  properties: {
    enabled: {
      type: 'boolean',
      example: true,
      description: 'Whether immutable releases are enabled for the repository.',
    },
    enforced_by_owner: {
      type: 'boolean',
      example: false,
      description:
        'Whether immutable releases are enforced by the repository owner.',
    },
  },
  required: ['enabled', 'enforced_by_owner'],
};

function _validateResponse(
  value: unknown,
): ReposCheckImmutableReleasesResponse {
  const _result = new Validator(_responseSchema).validate(value);
  if (!_result.valid) {
    throw new Error(
      `ReposCheckImmutableReleases response failed schema validation: ${JSON.stringify(_result.errors)}`,
    );
  }
  return value as ReposCheckImmutableReleasesResponse;
}

export const REPOS_CHECK_IMMUTABLE_RELEASES = new InjectionToken<
  (
    owner: string,
    repo: string,
  ) => ReturnType<typeof httpResource<ReposCheckImmutableReleasesResponse>>
>('REPOS_CHECK_IMMUTABLE_RELEASES');

export function provideReposCheckImmutableReleases(): FactoryProvider {
  return {
    provide: REPOS_CHECK_IMMUTABLE_RELEASES,
    useFactory: () => {
      const base = inject(GITHUB_BASE_URL);
      return (owner: string, repo: string) =>
        httpResource<ReposCheckImmutableReleasesResponse>(
          () => ({
            url: `${base}/repos/${owner}/${repo}/immutable-releases`,
          }),
          { parse: _validateResponse },
        );
    },
  };
}
