import { InjectionToken, inject, Signal } from '@angular/core';
import { httpResource } from '@angular/common/http';
import type { paths } from '../schema.d';
import { STRIPE_BASE_URL } from '../api-base-url.token';

export type DeleteRadarValueListsValueListBody = NonNullable<
  paths['/v1/radar/value_lists/{value_list}']['delete']['requestBody']
>['content']['application/x-www-form-urlencoded'];

export type DeleteRadarValueListsValueListResponse =
  paths['/v1/radar/value_lists/{value_list}']['delete']['responses']['200']['content']['application/json'];

export const DELETE_RADAR_VALUE_LISTS_VALUE_LIST = new InjectionToken<
  (
    valueList: string,
    body:
      | DeleteRadarValueListsValueListBody
      | Signal<DeleteRadarValueListsValueListBody>,
  ) => ReturnType<typeof httpResource<DeleteRadarValueListsValueListResponse>>
>('DELETE_RADAR_VALUE_LISTS_VALUE_LIST', {
  providedIn: 'root',
  factory: () => {
    const base = inject(STRIPE_BASE_URL);
    return (
      valueList: string,
      body:
        | DeleteRadarValueListsValueListBody
        | Signal<DeleteRadarValueListsValueListBody>,
    ) =>
      httpResource<DeleteRadarValueListsValueListResponse>(() => ({
        url: `${base}/v1/radar/value_lists/${valueList}`,
        method: 'DELETE',
        body,
      }));
  },
});
