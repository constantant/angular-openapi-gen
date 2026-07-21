import { InjectionToken, inject, Signal, FactoryProvider } from '@angular/core';
import { httpResource } from '@angular/common/http';
import { Validator, type Schema } from '@cfworker/json-schema';
import type { paths } from '../schema.d';
import { GITHUB_BASE_URL } from '../api-base-url.token';

export type ReposUpdateWebhookConfigForRepoBody = NonNullable<
  paths['/repos/{owner}/{repo}/hooks/{hook_id}/config']['patch']['requestBody']
>['content']['application/json'];

export type ReposUpdateWebhookConfigForRepoResponse =
  paths['/repos/{owner}/{repo}/hooks/{hook_id}/config']['patch']['responses']['200']['content']['application/json'];

const _responseSchema: Schema = {
  title: 'Webhook Configuration',
  description: 'Configuration object of the webhook',
  type: 'object',
  properties: {
    url: {
      type: 'string',
      description: 'The URL to which the payloads will be delivered.',
      example: 'https://example.com/webhook',
      format: 'uri',
    },
    content_type: {
      type: 'string',
      description:
        'The media type used to serialize the payloads. Supported values include `json` and `form`. The default is `form`.',
      example: '"json"',
    },
    secret: {
      type: 'string',
      description:
        'If provided, the `secret` will be used as the `key` to generate the HMAC hex digest value for [delivery signature headers](https://docs.github.com/webhooks/event-payloads/#delivery-headers).',
      example: '"********"',
    },
    insecure_ssl: {
      oneOf: [
        {
          type: 'string',
          description:
            'Determines whether the SSL certificate of the host for `url` will be verified when delivering payloads. Supported values include `0` (verification is performed) and `1` (verification is not performed). The default is `0`. **We strongly recommend not setting this to `1` as you are subject to man-in-the-middle and other attacks.**',
          example: '"0"',
        },
        {
          type: 'number',
        },
      ],
    },
  },
};

function _validateResponse(
  value: unknown,
): ReposUpdateWebhookConfigForRepoResponse {
  const _result = new Validator(_responseSchema).validate(value);
  if (!_result.valid) {
    throw new Error(
      `ReposUpdateWebhookConfigForRepo response failed schema validation: ${JSON.stringify(_result.errors)}`,
    );
  }
  return value as ReposUpdateWebhookConfigForRepoResponse;
}

export const REPOS_UPDATE_WEBHOOK_CONFIG_FOR_REPO = new InjectionToken<
  (
    owner: string,
    repo: string,
    hookId: string,
    body:
      | ReposUpdateWebhookConfigForRepoBody
      | Signal<ReposUpdateWebhookConfigForRepoBody>,
  ) => ReturnType<typeof httpResource<ReposUpdateWebhookConfigForRepoResponse>>
>('REPOS_UPDATE_WEBHOOK_CONFIG_FOR_REPO');

export function provideReposUpdateWebhookConfigForRepo(): FactoryProvider {
  return {
    provide: REPOS_UPDATE_WEBHOOK_CONFIG_FOR_REPO,
    useFactory: () => {
      const base = inject(GITHUB_BASE_URL);
      return (
        owner: string,
        repo: string,
        hookId: string,
        body:
          | ReposUpdateWebhookConfigForRepoBody
          | Signal<ReposUpdateWebhookConfigForRepoBody>,
      ) =>
        httpResource<ReposUpdateWebhookConfigForRepoResponse>(
          () => ({
            url: `${base}/repos/${owner}/${repo}/hooks/${hookId}/config`,
            method: 'PATCH',
            body,
          }),
          { parse: _validateResponse },
        );
    },
  };
}
