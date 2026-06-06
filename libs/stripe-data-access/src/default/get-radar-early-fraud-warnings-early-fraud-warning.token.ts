import { InjectionToken, inject } from '@angular/core';
import { httpResource } from '@angular/common/http';
import type { paths } from '../schema.d';
import { STRIPE_BASE_URL } from '../api-base-url.token';

export type GetRadarEarlyFraudWarningsEarlyFraudWarningParams =
  paths['/v1/radar/early_fraud_warnings/{early_fraud_warning}']['get']['parameters']['query'];

export type GetRadarEarlyFraudWarningsEarlyFraudWarningResponse =
  paths['/v1/radar/early_fraud_warnings/{early_fraud_warning}']['get']['responses']['200']['content']['application/json'];

export const GET_RADAR_EARLY_FRAUD_WARNINGS_EARLY_FRAUD_WARNING =
  new InjectionToken<
    (
      earlyFraudWarning: string,
      params?:
        | GetRadarEarlyFraudWarningsEarlyFraudWarningParams
        | (() => GetRadarEarlyFraudWarningsEarlyFraudWarningParams | undefined),
    ) => ReturnType<
      typeof httpResource<GetRadarEarlyFraudWarningsEarlyFraudWarningResponse>
    >
  >('GET_RADAR_EARLY_FRAUD_WARNINGS_EARLY_FRAUD_WARNING', {
    providedIn: 'root',
    factory: () => {
      const base = inject(STRIPE_BASE_URL);
      return (
        earlyFraudWarning: string,
        params?:
          | GetRadarEarlyFraudWarningsEarlyFraudWarningParams
          | (() =>
              | GetRadarEarlyFraudWarningsEarlyFraudWarningParams
              | undefined),
      ) =>
        httpResource<GetRadarEarlyFraudWarningsEarlyFraudWarningResponse>(
          () => ({
            url: `${base}/v1/radar/early_fraud_warnings/${earlyFraudWarning}`,
            params: (typeof params === 'function'
              ? params()
              : params) as unknown as Record<
              string,
              string | number | boolean | readonly (string | number | boolean)[]
            >,
          }),
        );
    },
  });
