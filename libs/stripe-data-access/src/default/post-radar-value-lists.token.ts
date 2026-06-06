import { InjectionToken, inject, Signal, FactoryProvider } from '@angular/core';
import { httpResource } from '@angular/common/http';
import type { paths } from '../schema.d';
import { STRIPE_BASE_URL } from '../api-base-url.token';

export type PostRadarValueListsBody = NonNullable<
  paths['/v1/radar/value_lists']['post']['requestBody']
>['content']['application/x-www-form-urlencoded'];

export type PostRadarValueListsResponse =
  paths['/v1/radar/value_lists']['post']['responses']['200']['content']['application/json'];

export const POST_RADAR_VALUE_LISTS = new InjectionToken<
  (
    body: PostRadarValueListsBody | Signal<PostRadarValueListsBody>,
  ) => ReturnType<typeof httpResource<PostRadarValueListsResponse>>
>('POST_RADAR_VALUE_LISTS');

export function providePostRadarValueLists(): FactoryProvider {
  return {
    provide: POST_RADAR_VALUE_LISTS,
    useFactory: () => {
      const base = inject(STRIPE_BASE_URL);
      return (
        body: PostRadarValueListsBody | Signal<PostRadarValueListsBody>,
      ) =>
        httpResource<PostRadarValueListsResponse>(() => ({
          url: `${base}/v1/radar/value_lists`,
          method: 'POST',
          body,
        }));
    },
  };
}
