import { InjectionToken, inject, FactoryProvider } from '@angular/core';
import { httpResource } from '@angular/common/http';
import { Validator, type Schema } from '@cfworker/json-schema';
import type { paths } from '../schema.d';
import { GITHUB_BASE_URL } from '../api-base-url.token';

export type ReposListContributorsParams =
  paths['/repos/{owner}/{repo}/contributors']['get']['parameters']['query'];

export type ReposListContributorsResponse =
  paths['/repos/{owner}/{repo}/contributors']['get']['responses']['200']['content']['application/json'];

export type ReposListContributorsError =
  | paths['/repos/{owner}/{repo}/contributors']['get']['responses']['403']['content']['application/json']
  | paths['/repos/{owner}/{repo}/contributors']['get']['responses']['404']['content']['application/json'];

const _responseSchema: Schema = {
  type: 'array',
  items: {
    title: 'Contributor',
    description: 'Contributor',
    type: 'object',
    properties: {
      login: {
        type: 'string',
      },
      id: {
        type: 'integer',
      },
      node_id: {
        type: 'string',
      },
      avatar_url: {
        type: 'string',
        format: 'uri',
      },
      gravatar_id: {
        type: ['string', 'null'],
      },
      url: {
        type: 'string',
        format: 'uri',
      },
      html_url: {
        type: 'string',
        format: 'uri',
      },
      followers_url: {
        type: 'string',
        format: 'uri',
      },
      following_url: {
        type: 'string',
      },
      gists_url: {
        type: 'string',
      },
      starred_url: {
        type: 'string',
      },
      subscriptions_url: {
        type: 'string',
        format: 'uri',
      },
      organizations_url: {
        type: 'string',
        format: 'uri',
      },
      repos_url: {
        type: 'string',
        format: 'uri',
      },
      events_url: {
        type: 'string',
      },
      received_events_url: {
        type: 'string',
        format: 'uri',
      },
      type: {
        type: 'string',
      },
      site_admin: {
        type: 'boolean',
      },
      contributions: {
        type: 'integer',
      },
      email: {
        type: 'string',
      },
      name: {
        type: 'string',
      },
      user_view_type: {
        type: 'string',
      },
    },
    required: ['contributions', 'type'],
  },
};

function _validateResponse(value: unknown): ReposListContributorsResponse {
  const _result = new Validator(_responseSchema).validate(value);
  if (!_result.valid) {
    throw new Error(
      `ReposListContributors response failed schema validation: ${JSON.stringify(_result.errors)}`,
    );
  }
  return value as ReposListContributorsResponse;
}

export const REPOS_LIST_CONTRIBUTORS = new InjectionToken<
  (
    owner: string,
    repo: string,
    params?:
      | ReposListContributorsParams
      | (() => ReposListContributorsParams | undefined),
  ) => ReturnType<typeof httpResource<ReposListContributorsResponse>>
>('REPOS_LIST_CONTRIBUTORS');

export function provideReposListContributors(): FactoryProvider {
  return {
    provide: REPOS_LIST_CONTRIBUTORS,
    useFactory: () => {
      const base = inject(GITHUB_BASE_URL);
      return (
        owner: string,
        repo: string,
        params?:
          | ReposListContributorsParams
          | (() => ReposListContributorsParams | undefined),
      ) =>
        httpResource<ReposListContributorsResponse>(
          () => {
            const _params = typeof params === 'function' ? params() : params;
            if (typeof params === 'function' && _params === undefined)
              return undefined;
            return {
              url: `${base}/repos/${owner}/${repo}/contributors`,
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
