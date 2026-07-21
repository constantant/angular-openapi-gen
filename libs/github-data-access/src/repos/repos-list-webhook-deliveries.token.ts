import { InjectionToken, inject, FactoryProvider } from '@angular/core';
import { httpResource } from '@angular/common/http';
import { Validator, type Schema } from '@cfworker/json-schema';
import type { paths } from '../schema.d';
import { GITHUB_BASE_URL } from '../api-base-url.token';

export type ReposListWebhookDeliveriesParams =
  paths['/repos/{owner}/{repo}/hooks/{hook_id}/deliveries']['get']['parameters']['query'];

export type ReposListWebhookDeliveriesResponse =
  paths['/repos/{owner}/{repo}/hooks/{hook_id}/deliveries']['get']['responses']['200']['content']['application/json'];

export type ReposListWebhookDeliveriesError =
  | paths['/repos/{owner}/{repo}/hooks/{hook_id}/deliveries']['get']['responses']['400']['content']['application/json']
  | paths['/repos/{owner}/{repo}/hooks/{hook_id}/deliveries']['get']['responses']['422']['content']['application/json'];

const _responseSchema: Schema = {
  type: 'array',
  items: {
    title: 'Simple webhook delivery',
    description:
      'Delivery made by a webhook, without request and response information.',
    type: 'object',
    properties: {
      id: {
        description: 'Unique identifier of the webhook delivery.',
        type: 'integer',
        format: 'int64',
        example: 42,
      },
      guid: {
        description:
          'Unique identifier for the event (shared with all deliveries for all webhooks that subscribe to this event).',
        type: 'string',
        example: '58474f00-b361-11eb-836d-0e4f3503ccbe',
      },
      delivered_at: {
        description: 'Time when the webhook delivery occurred.',
        type: 'string',
        format: 'date-time',
        example: '2021-05-12T20:33:44Z',
      },
      redelivery: {
        description: 'Whether the webhook delivery is a redelivery.',
        type: 'boolean',
        example: false,
      },
      duration: {
        description: 'Time spent delivering.',
        type: 'number',
        example: 0.03,
      },
      status: {
        description:
          'Describes the response returned after attempting the delivery.',
        type: 'string',
        example: 'failed to connect',
      },
      status_code: {
        description: 'Status code received when delivery was made.',
        type: 'integer',
        example: 502,
      },
      event: {
        description: 'The event that triggered the delivery.',
        type: 'string',
        example: 'issues',
      },
      action: {
        description:
          'The type of activity for the event that triggered the delivery.',
        type: ['string', 'null'],
        example: 'opened',
      },
      installation_id: {
        description:
          'The id of the GitHub App installation associated with this event.',
        type: ['integer', 'null'],
        format: 'int64',
        example: 123,
      },
      repository_id: {
        description: 'The id of the repository associated with this event.',
        type: ['integer', 'null'],
        format: 'int64',
        example: 123,
      },
      throttled_at: {
        description: 'Time when the webhook delivery was throttled.',
        type: ['string', 'null'],
        format: 'date-time',
        example: '2021-05-12T20:33:44Z',
      },
    },
    required: [
      'id',
      'guid',
      'delivered_at',
      'redelivery',
      'duration',
      'status',
      'status_code',
      'event',
      'action',
      'installation_id',
      'repository_id',
    ],
  },
};

function _validateResponse(value: unknown): ReposListWebhookDeliveriesResponse {
  const _result = new Validator(_responseSchema).validate(value);
  if (!_result.valid) {
    throw new Error(
      `ReposListWebhookDeliveries response failed schema validation: ${JSON.stringify(_result.errors)}`,
    );
  }
  return value as ReposListWebhookDeliveriesResponse;
}

export const REPOS_LIST_WEBHOOK_DELIVERIES = new InjectionToken<
  (
    owner: string,
    repo: string,
    hookId: string,
    params?:
      | ReposListWebhookDeliveriesParams
      | (() => ReposListWebhookDeliveriesParams | undefined),
  ) => ReturnType<typeof httpResource<ReposListWebhookDeliveriesResponse>>
>('REPOS_LIST_WEBHOOK_DELIVERIES');

export function provideReposListWebhookDeliveries(): FactoryProvider {
  return {
    provide: REPOS_LIST_WEBHOOK_DELIVERIES,
    useFactory: () => {
      const base = inject(GITHUB_BASE_URL);
      return (
        owner: string,
        repo: string,
        hookId: string,
        params?:
          | ReposListWebhookDeliveriesParams
          | (() => ReposListWebhookDeliveriesParams | undefined),
      ) =>
        httpResource<ReposListWebhookDeliveriesResponse>(
          () => {
            const _params = typeof params === 'function' ? params() : params;
            if (typeof params === 'function' && _params === undefined)
              return undefined;
            return {
              url: `${base}/repos/${owner}/${repo}/hooks/${hookId}/deliveries`,
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
