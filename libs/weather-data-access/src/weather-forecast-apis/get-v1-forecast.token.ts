import { InjectionToken, inject, FactoryProvider } from '@angular/core';
import { httpResource } from '@angular/common/http';
import type { paths } from '../schema.d';
import { WEATHER_BASE_URL } from '../api-base-url.token';

export type GetV1ForecastParams =
  paths['/v1/forecast']['get']['parameters']['query'];

export type GetV1ForecastResponse =
  paths['/v1/forecast']['get']['responses']['200']['content']['application/json'];

export const GET_V1_FORECAST = new InjectionToken<
  (
    params?: GetV1ForecastParams | (() => GetV1ForecastParams | undefined),
  ) => ReturnType<typeof httpResource<GetV1ForecastResponse>>
>('GET_V1_FORECAST');

export function provideGetV1Forecast(): FactoryProvider {
  return {
    provide: GET_V1_FORECAST,
    useFactory: () => {
      const base = inject(WEATHER_BASE_URL);
      return (
        params?: GetV1ForecastParams | (() => GetV1ForecastParams | undefined),
      ) =>
        httpResource<GetV1ForecastResponse>(() => {
          const _params = typeof params === 'function' ? params() : params;
          if (typeof params === 'function' && _params === undefined)
            return undefined;
          return {
            url: `${base}/v1/forecast`,
            params: _params as unknown as Record<
              string,
              string | number | boolean | readonly (string | number | boolean)[]
            >,
          };
        });
    },
  };
}
