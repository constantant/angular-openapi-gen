import { InjectionToken, inject, FactoryProvider } from '@angular/core';
import { httpResource } from '@angular/common/http';
import { Validator, type Schema } from '@cfworker/json-schema';
import type { paths } from '../schema.d';
import { GITHUB_BASE_URL } from '../api-base-url.token';

export type ReposRedeliverWebhookDeliveryResponse =
  paths['/repos/{owner}/{repo}/hooks/{hook_id}/deliveries/{delivery_id}/attempts']['post']['responses']['202']['content']['application/json'];

export type ReposRedeliverWebhookDeliveryError =
  | paths['/repos/{owner}/{repo}/hooks/{hook_id}/deliveries/{delivery_id}/attempts']['post']['responses']['400']['content']['application/json']
  | paths['/repos/{owner}/{repo}/hooks/{hook_id}/deliveries/{delivery_id}/attempts']['post']['responses']['422']['content']['application/json'];

const _responseSchema: Schema = {
  type: 'object',
};

function _validateResponse(
  value: unknown,
): ReposRedeliverWebhookDeliveryResponse {
  const _result = new Validator(_responseSchema).validate(value);
  if (!_result.valid) {
    throw new Error(
      `ReposRedeliverWebhookDelivery response failed schema validation: ${JSON.stringify(_result.errors)}`,
    );
  }
  return value as ReposRedeliverWebhookDeliveryResponse;
}

export const REPOS_REDELIVER_WEBHOOK_DELIVERY = new InjectionToken<
  (
    owner: string,
    repo: string,
    hookId: string,
    deliveryId: string,
  ) => ReturnType<typeof httpResource<ReposRedeliverWebhookDeliveryResponse>>
>('REPOS_REDELIVER_WEBHOOK_DELIVERY');

export function provideReposRedeliverWebhookDelivery(): FactoryProvider {
  return {
    provide: REPOS_REDELIVER_WEBHOOK_DELIVERY,
    useFactory: () => {
      const base = inject(GITHUB_BASE_URL);
      return (
        owner: string,
        repo: string,
        hookId: string,
        deliveryId: string,
      ) =>
        httpResource<ReposRedeliverWebhookDeliveryResponse>(
          () => ({
            url: `${base}/repos/${owner}/${repo}/hooks/${hookId}/deliveries/${deliveryId}/attempts`,
            method: 'POST',
          }),
          { parse: _validateResponse },
        );
    },
  };
}
