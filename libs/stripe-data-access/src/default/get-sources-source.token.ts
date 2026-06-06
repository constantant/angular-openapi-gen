import { InjectionToken, inject, FactoryProvider } from '@angular/core';
import { httpResource } from '@angular/common/http';
import type { paths } from '../schema.d';
import { STRIPE_BASE_URL } from '../api-base-url.token';

export type GetSourcesSourceParams =
  paths['/v1/sources/{source}']['get']['parameters']['query'];

export type GetSourcesSourceResponse =
  paths['/v1/sources/{source}']['get']['responses']['200']['content']['application/json'];

export const GET_SOURCES_SOURCE = new InjectionToken<
  (
    source: string,
    params?:
      | GetSourcesSourceParams
      | (() => GetSourcesSourceParams | undefined),
  ) => ReturnType<typeof httpResource<GetSourcesSourceResponse>>
>('GET_SOURCES_SOURCE');

export function provideGetSourcesSource(): FactoryProvider {
  return {
    provide: GET_SOURCES_SOURCE,
    useFactory: () => {
      const base = inject(STRIPE_BASE_URL);
      return (
        source: string,
        params?:
          | GetSourcesSourceParams
          | (() => GetSourcesSourceParams | undefined),
      ) =>
        httpResource<GetSourcesSourceResponse>(() => ({
          url: `${base}/v1/sources/${source}`,
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
