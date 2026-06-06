import { InjectionToken, inject } from '@angular/core';
import { httpResource } from '@angular/common/http';
import type { paths } from '../schema.d';
import { STRIPE_BASE_URL } from '../api-base-url.token';

type GetSourcesSourceMandateNotificationsMandateNotificationParams =
  paths['/v1/sources/{source}/mandate_notifications/{mandate_notification}']['get']['parameters']['query'];

type GetSourcesSourceMandateNotificationsMandateNotificationResponse =
  paths['/v1/sources/{source}/mandate_notifications/{mandate_notification}']['get']['responses']['200']['content']['application/json'];

export const GET_SOURCES_SOURCE_MANDATE_NOTIFICATIONS_MANDATE_NOTIFICATION =
  new InjectionToken<
    (
      mandate_notification: string,
      source: string,
      params?: GetSourcesSourceMandateNotificationsMandateNotificationParams,
    ) => ReturnType<
      typeof httpResource<GetSourcesSourceMandateNotificationsMandateNotificationResponse>
    >
  >('GET_SOURCES_SOURCE_MANDATE_NOTIFICATIONS_MANDATE_NOTIFICATION', {
    providedIn: 'root',
    factory: () => {
      const base = inject(STRIPE_BASE_URL);
      return (
        mandate_notification: string,
        source: string,
        params?: GetSourcesSourceMandateNotificationsMandateNotificationParams,
      ) =>
        httpResource<GetSourcesSourceMandateNotificationsMandateNotificationResponse>(
          () => ({
            url: `${base}/v1/sources/${source}/mandate_notifications/${mandate_notification}`,
            params: params as unknown as Record<
              string,
              string | number | boolean | readonly (string | number | boolean)[]
            >,
          }),
        );
    },
  });
