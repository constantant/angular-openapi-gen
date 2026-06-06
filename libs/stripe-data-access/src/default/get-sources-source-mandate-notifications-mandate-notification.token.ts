import { InjectionToken, inject, FactoryProvider } from '@angular/core';
import { httpResource } from '@angular/common/http';
import type { paths } from '../schema.d';
import { STRIPE_BASE_URL } from '../api-base-url.token';

export type GetSourcesSourceMandateNotificationsMandateNotificationParams =
  paths['/v1/sources/{source}/mandate_notifications/{mandate_notification}']['get']['parameters']['query'];

export type GetSourcesSourceMandateNotificationsMandateNotificationResponse =
  paths['/v1/sources/{source}/mandate_notifications/{mandate_notification}']['get']['responses']['200']['content']['application/json'];

export const GET_SOURCES_SOURCE_MANDATE_NOTIFICATIONS_MANDATE_NOTIFICATION =
  new InjectionToken<
    (
      mandateNotification: string,
      source: string,
      params?:
        | GetSourcesSourceMandateNotificationsMandateNotificationParams
        | (() =>
            | GetSourcesSourceMandateNotificationsMandateNotificationParams
            | undefined),
    ) => ReturnType<
      typeof httpResource<GetSourcesSourceMandateNotificationsMandateNotificationResponse>
    >
  >('GET_SOURCES_SOURCE_MANDATE_NOTIFICATIONS_MANDATE_NOTIFICATION');

export function provideGetSourcesSourceMandateNotificationsMandateNotification(): FactoryProvider {
  return {
    provide: GET_SOURCES_SOURCE_MANDATE_NOTIFICATIONS_MANDATE_NOTIFICATION,
    useFactory: () => {
      const base = inject(STRIPE_BASE_URL);
      return (
        mandateNotification: string,
        source: string,
        params?:
          | GetSourcesSourceMandateNotificationsMandateNotificationParams
          | (() =>
              | GetSourcesSourceMandateNotificationsMandateNotificationParams
              | undefined),
      ) =>
        httpResource<GetSourcesSourceMandateNotificationsMandateNotificationResponse>(
          () => ({
            url: `${base}/v1/sources/${source}/mandate_notifications/${mandateNotification}`,
            params: (typeof params === 'function'
              ? params()
              : params) as unknown as Record<
              string,
              string | number | boolean | readonly (string | number | boolean)[]
            >,
          }),
        );
    },
  };
}
