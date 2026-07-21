import { InjectionToken, inject, FactoryProvider } from '@angular/core';
import { httpResource } from '@angular/common/http';
import { Validator, type Schema } from '@cfworker/json-schema';
import type { paths } from '../schema.d';
import { GITHUB_BASE_URL } from '../api-base-url.token';

export type ReposGetWebhookDeliveryResponse =
  paths['/repos/{owner}/{repo}/hooks/{hook_id}/deliveries/{delivery_id}']['get']['responses']['200']['content']['application/json'];

export type ReposGetWebhookDeliveryError =
  | paths['/repos/{owner}/{repo}/hooks/{hook_id}/deliveries/{delivery_id}']['get']['responses']['400']['content']['application/json']
  | paths['/repos/{owner}/{repo}/hooks/{hook_id}/deliveries/{delivery_id}']['get']['responses']['422']['content']['application/json'];

const _responseSchema: Schema = {
  title: 'Webhook delivery',
  description: 'Delivery made by a webhook.',
  type: 'object',
  properties: {
    id: {
      description: 'Unique identifier of the delivery.',
      type: 'integer',
      example: 42,
    },
    guid: {
      description:
        'Unique identifier for the event (shared with all deliveries for all webhooks that subscribe to this event).',
      type: 'string',
      example: '58474f00-b361-11eb-836d-0e4f3503ccbe',
    },
    delivered_at: {
      description: 'Time when the delivery was delivered.',
      type: 'string',
      format: 'date-time',
      example: '2021-05-12T20:33:44Z',
    },
    redelivery: {
      description: 'Whether the delivery is a redelivery.',
      type: 'boolean',
      example: false,
    },
    duration: {
      description: 'Time spent delivering.',
      type: 'number',
      example: 0.03,
    },
    status: {
      description: 'Description of the status of the attempted delivery',
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
      example: 123,
    },
    repository_id: {
      description: 'The id of the repository associated with this event.',
      type: ['integer', 'null'],
      example: 123,
    },
    throttled_at: {
      description: 'Time when the webhook delivery was throttled.',
      type: ['string', 'null'],
      format: 'date-time',
      example: '2021-05-12T20:33:44Z',
    },
    url: {
      description: 'The URL target of the delivery.',
      type: 'string',
      example: 'https://www.example.com',
    },
    request: {
      type: 'object',
      properties: {
        headers: {
          description: 'The request headers sent with the webhook delivery.',
          type: ['object', 'null'],
          additionalProperties: true,
        },
        payload: {
          description: 'The webhook payload.',
          type: ['object', 'null'],
          additionalProperties: true,
        },
      },
      required: ['headers', 'payload'],
    },
    response: {
      type: 'object',
      properties: {
        headers: {
          description:
            'The response headers received when the delivery was made.',
          type: ['object', 'null'],
          additionalProperties: true,
        },
        payload: {
          description: 'The response payload received.',
          type: ['string', 'null'],
          additionalProperties: true,
        },
      },
      required: ['headers', 'payload'],
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
    'request',
    'response',
  ],
};

function _validateResponse(value: unknown): ReposGetWebhookDeliveryResponse {
  const _result = new Validator(_responseSchema).validate(value);
  if (!_result.valid) {
    throw new Error(
      `ReposGetWebhookDelivery response failed schema validation: ${JSON.stringify(_result.errors)}`,
    );
  }
  return value as ReposGetWebhookDeliveryResponse;
}

export const REPOS_GET_WEBHOOK_DELIVERY = new InjectionToken<
  (
    owner: string,
    repo: string,
    hookId: string,
    deliveryId: string,
  ) => ReturnType<typeof httpResource<ReposGetWebhookDeliveryResponse>>
>('REPOS_GET_WEBHOOK_DELIVERY');

export function provideReposGetWebhookDelivery(): FactoryProvider {
  return {
    provide: REPOS_GET_WEBHOOK_DELIVERY,
    useFactory: () => {
      const base = inject(GITHUB_BASE_URL);
      return (
        owner: string,
        repo: string,
        hookId: string,
        deliveryId: string,
      ) =>
        httpResource<ReposGetWebhookDeliveryResponse>(
          () => ({
            url: `${base}/repos/${owner}/${repo}/hooks/${hookId}/deliveries/${deliveryId}`,
          }),
          { parse: _validateResponse },
        );
    },
  };
}
