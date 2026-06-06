import { InjectionToken, inject, Signal } from '@angular/core';
import { httpResource } from '@angular/common/http';
import type { paths } from '../schema.d';
import { STRIPE_BASE_URL } from '../api-base-url.token';

type PostRadarValueListsValueListBody = NonNullable<
  paths['/v1/radar/value_lists/{value_list}']['post']['requestBody']
>['content']['application/x-www-form-urlencoded'];

type PostRadarValueListsValueListResponse =
  paths['/v1/radar/value_lists/{value_list}']['post']['responses']['200']['content']['application/json'];

export const POST_RADAR_VALUE_LISTS_VALUE_LIST = new InjectionToken<
  (
    value_list: string,
    body:
      | PostRadarValueListsValueListBody
      | Signal<PostRadarValueListsValueListBody>,
  ) => ReturnType<typeof httpResource<PostRadarValueListsValueListResponse>>
>('POST_RADAR_VALUE_LISTS_VALUE_LIST', {
  providedIn: 'root',
  factory: () => {
    const base = inject(STRIPE_BASE_URL);
    return (
      value_list: string,
      body:
        | PostRadarValueListsValueListBody
        | Signal<PostRadarValueListsValueListBody>,
    ) =>
      httpResource<PostRadarValueListsValueListResponse>(() => ({
        url: `${base}/v1/radar/value_lists/${value_list}`,
        method: 'POST',
        body,
      }));
  },
});
