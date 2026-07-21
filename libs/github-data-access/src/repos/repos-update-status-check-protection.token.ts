import { InjectionToken, inject, Signal, FactoryProvider } from '@angular/core';
import { httpResource } from '@angular/common/http';
import { Validator, type Schema } from '@cfworker/json-schema';
import type { paths } from '../schema.d';
import { GITHUB_BASE_URL } from '../api-base-url.token';

export type ReposUpdateStatusCheckProtectionBody = NonNullable<
  paths['/repos/{owner}/{repo}/branches/{branch}/protection/required_status_checks']['patch']['requestBody']
>['content']['application/json'];

export type ReposUpdateStatusCheckProtectionResponse =
  paths['/repos/{owner}/{repo}/branches/{branch}/protection/required_status_checks']['patch']['responses']['200']['content']['application/json'];

export type ReposUpdateStatusCheckProtectionError =
  | paths['/repos/{owner}/{repo}/branches/{branch}/protection/required_status_checks']['patch']['responses']['404']['content']['application/json']
  | paths['/repos/{owner}/{repo}/branches/{branch}/protection/required_status_checks']['patch']['responses']['422']['content']['application/json'];

const _responseSchema: Schema = {
  title: 'Status Check Policy',
  description: 'Status Check Policy',
  type: 'object',
  properties: {
    url: {
      type: 'string',
      format: 'uri',
      example:
        'https://api.github.com/repos/octocat/Hello-World/branches/master/protection/required_status_checks',
    },
    strict: {
      type: 'boolean',
      example: true,
    },
    contexts: {
      type: 'array',
      example: ['continuous-integration/travis-ci'],
      items: {
        type: 'string',
      },
    },
    checks: {
      type: 'array',
      items: {
        type: 'object',
        properties: {
          context: {
            type: 'string',
            example: 'continuous-integration/travis-ci',
          },
          app_id: {
            type: ['integer', 'null'],
          },
        },
        required: ['context', 'app_id'],
      },
    },
    contexts_url: {
      type: 'string',
      format: 'uri',
      example:
        'https://api.github.com/repos/octocat/Hello-World/branches/master/protection/required_status_checks/contexts',
    },
  },
  required: ['url', 'contexts_url', 'strict', 'contexts', 'checks'],
};

function _validateResponse(
  value: unknown,
): ReposUpdateStatusCheckProtectionResponse {
  const _result = new Validator(_responseSchema).validate(value);
  if (!_result.valid) {
    throw new Error(
      `ReposUpdateStatusCheckProtection response failed schema validation: ${JSON.stringify(_result.errors)}`,
    );
  }
  return value as ReposUpdateStatusCheckProtectionResponse;
}

export const REPOS_UPDATE_STATUS_CHECK_PROTECTION = new InjectionToken<
  (
    owner: string,
    repo: string,
    branch: string,
    body:
      | ReposUpdateStatusCheckProtectionBody
      | Signal<ReposUpdateStatusCheckProtectionBody>,
  ) => ReturnType<typeof httpResource<ReposUpdateStatusCheckProtectionResponse>>
>('REPOS_UPDATE_STATUS_CHECK_PROTECTION');

export function provideReposUpdateStatusCheckProtection(): FactoryProvider {
  return {
    provide: REPOS_UPDATE_STATUS_CHECK_PROTECTION,
    useFactory: () => {
      const base = inject(GITHUB_BASE_URL);
      return (
        owner: string,
        repo: string,
        branch: string,
        body:
          | ReposUpdateStatusCheckProtectionBody
          | Signal<ReposUpdateStatusCheckProtectionBody>,
      ) =>
        httpResource<ReposUpdateStatusCheckProtectionResponse>(
          () => ({
            url: `${base}/repos/${owner}/${repo}/branches/${branch}/protection/required_status_checks`,
            method: 'PATCH',
            body,
          }),
          { parse: _validateResponse },
        );
    },
  };
}
