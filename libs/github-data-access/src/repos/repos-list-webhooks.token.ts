import { InjectionToken, inject, FactoryProvider } from '@angular/core';
import { httpResource } from '@angular/common/http';
import { Validator, type Schema } from '@cfworker/json-schema';
import type { paths } from '../schema.d';
import { GITHUB_BASE_URL } from '../api-base-url.token';

export type ReposListWebhooksParams =
  paths['/repos/{owner}/{repo}/hooks']['get']['parameters']['query'];

export type ReposListWebhooksResponse =
  paths['/repos/{owner}/{repo}/hooks']['get']['responses']['200']['content']['application/json'];

export type ReposListWebhooksError =
  paths['/repos/{owner}/{repo}/hooks']['get']['responses']['404']['content']['application/json'];

const _responseSchema: Schema = {
  type: 'array',
  items: {
    title: 'Webhook',
    description: 'Webhooks for repositories.',
    type: 'object',
    properties: {
      type: {
        type: 'string',
      },
      id: {
        description: 'Unique identifier of the webhook.',
        example: 42,
        type: 'integer',
      },
      name: {
        description: "The name of a valid service, use 'web' for a webhook.",
        example: 'web',
        type: 'string',
      },
      active: {
        description:
          'Determines whether the hook is actually triggered on pushes.',
        type: 'boolean',
        example: true,
      },
      events: {
        description:
          "Determines what events the hook is triggered for. Default: ['push'].",
        type: 'array',
        items: {
          type: 'string',
        },
        example: ['push', 'pull_request'],
      },
      config: {
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
      },
      updated_at: {
        type: 'string',
        format: 'date-time',
        example: '2011-09-06T20:39:23Z',
      },
      created_at: {
        type: 'string',
        format: 'date-time',
        example: '2011-09-06T17:26:27Z',
      },
      url: {
        type: 'string',
        format: 'uri',
        example: 'https://api.github.com/repos/octocat/Hello-World/hooks/1',
      },
      test_url: {
        type: 'string',
        format: 'uri',
        example:
          'https://api.github.com/repos/octocat/Hello-World/hooks/1/test',
      },
      ping_url: {
        type: 'string',
        format: 'uri',
        example:
          'https://api.github.com/repos/octocat/Hello-World/hooks/1/pings',
      },
      deliveries_url: {
        type: 'string',
        format: 'uri',
        example:
          'https://api.github.com/repos/octocat/Hello-World/hooks/1/deliveries',
      },
      last_response: {
        title: 'Hook Response',
        type: 'object',
        properties: {
          code: {
            type: ['integer', 'null'],
          },
          status: {
            type: ['string', 'null'],
          },
          message: {
            type: ['string', 'null'],
          },
        },
        required: ['code', 'status', 'message'],
      },
    },
    required: [
      'id',
      'url',
      'type',
      'name',
      'active',
      'events',
      'config',
      'ping_url',
      'created_at',
      'updated_at',
      'last_response',
      'test_url',
    ],
  },
};

function _validateResponse(value: unknown): ReposListWebhooksResponse {
  const _result = new Validator(_responseSchema).validate(value);
  if (!_result.valid) {
    throw new Error(
      `ReposListWebhooks response failed schema validation: ${JSON.stringify(_result.errors)}`,
    );
  }
  return value as ReposListWebhooksResponse;
}

export const REPOS_LIST_WEBHOOKS = new InjectionToken<
  (
    owner: string,
    repo: string,
    params?:
      ReposListWebhooksParams | (() => ReposListWebhooksParams | undefined),
  ) => ReturnType<typeof httpResource<ReposListWebhooksResponse>>
>('REPOS_LIST_WEBHOOKS');

export function provideReposListWebhooks(): FactoryProvider {
  return {
    provide: REPOS_LIST_WEBHOOKS,
    useFactory: () => {
      const base = inject(GITHUB_BASE_URL);
      return (
        owner: string,
        repo: string,
        params?:
          ReposListWebhooksParams | (() => ReposListWebhooksParams | undefined),
      ) =>
        httpResource<ReposListWebhooksResponse>(
          () => {
            const _params = typeof params === 'function' ? params() : params;
            if (typeof params === 'function' && _params === undefined)
              return undefined;
            return {
              url: `${base}/repos/${owner}/${repo}/hooks`,
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
