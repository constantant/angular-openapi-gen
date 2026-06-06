import { InjectionToken, inject, Signal, FactoryProvider } from '@angular/core';
import { httpResource } from '@angular/common/http';
import type { paths } from '../schema.d';
import { STRIPE_BASE_URL } from '../api-base-url.token';

export type PostSourcesSourceBody = NonNullable<
  paths['/v1/sources/{source}']['post']['requestBody']
>['content']['application/x-www-form-urlencoded'];

export type PostSourcesSourceResponse =
  paths['/v1/sources/{source}']['post']['responses']['200']['content']['application/json'];

export const POST_SOURCES_SOURCE = new InjectionToken<
  (
    source: string,
    body: PostSourcesSourceBody | Signal<PostSourcesSourceBody>,
  ) => ReturnType<typeof httpResource<PostSourcesSourceResponse>>
>('POST_SOURCES_SOURCE');

export function providePostSourcesSource(): FactoryProvider {
  return {
    provide: POST_SOURCES_SOURCE,
    useFactory: () => {
      const base = inject(STRIPE_BASE_URL);
      return (
        source: string,
        body: PostSourcesSourceBody | Signal<PostSourcesSourceBody>,
      ) =>
        httpResource<PostSourcesSourceResponse>(() => ({
          url: `${base}/v1/sources/${source}`,
          method: 'POST',
          body,
        }));
    },
  };
}
