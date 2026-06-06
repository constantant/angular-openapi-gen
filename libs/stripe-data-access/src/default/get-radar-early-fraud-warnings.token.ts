import { InjectionToken, inject, FactoryProvider } from '@angular/core';
import { httpResource } from '@angular/common/http';
import type { paths } from '../schema.d';
import { STRIPE_BASE_URL } from '../api-base-url.token';

export type GetRadarEarlyFraudWarningsParams =
  paths['/v1/radar/early_fraud_warnings']['get']['parameters']['query'];

export type GetRadarEarlyFraudWarningsResponse =
  paths['/v1/radar/early_fraud_warnings']['get']['responses']['200']['content']['application/json'];

export const GET_RADAR_EARLY_FRAUD_WARNINGS = new InjectionToken<
  (
    params?:
      | GetRadarEarlyFraudWarningsParams
      | (() => GetRadarEarlyFraudWarningsParams | undefined),
  ) => ReturnType<typeof httpResource<GetRadarEarlyFraudWarningsResponse>>
>('GET_RADAR_EARLY_FRAUD_WARNINGS');

export function provideGetRadarEarlyFraudWarnings(): FactoryProvider {
  return {
    provide: GET_RADAR_EARLY_FRAUD_WARNINGS,
    useFactory: () => {
      const base = inject(STRIPE_BASE_URL);
      return (
        params?:
          | GetRadarEarlyFraudWarningsParams
          | (() => GetRadarEarlyFraudWarningsParams | undefined),
      ) =>
        httpResource<GetRadarEarlyFraudWarningsResponse>(() => ({
          url: `${base}/v1/radar/early_fraud_warnings`,
          params: (typeof params === 'function'
            ? params()
            : params) as unknown as Record<
            string,
            string | number | boolean | readonly (string | number | boolean)[]
          >,
        }));
    },
  };
}
