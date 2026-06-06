import { InjectionToken, inject, Signal, FactoryProvider } from '@angular/core';
import { httpResource } from '@angular/common/http';
import type { paths } from '../schema.d';
import { STRIPE_BASE_URL } from '../api-base-url.token';

export type PostSourcesSourceVerifyBody = NonNullable<
  paths['/v1/sources/{source}/verify']['post']['requestBody']
>['content']['application/x-www-form-urlencoded'];

export type PostSourcesSourceVerifyResponse =
  paths['/v1/sources/{source}/verify']['post']['responses']['200']['content']['application/json'];

export const POST_SOURCES_SOURCE_VERIFY = new InjectionToken<
  (
    source: string,
    body: PostSourcesSourceVerifyBody | Signal<PostSourcesSourceVerifyBody>,
  ) => ReturnType<typeof httpResource<PostSourcesSourceVerifyResponse>>
>('POST_SOURCES_SOURCE_VERIFY');

export function providePostSourcesSourceVerify(): FactoryProvider {
  return {
    provide: POST_SOURCES_SOURCE_VERIFY,
    useFactory: () => {
      const base = inject(STRIPE_BASE_URL);
      return (
        source: string,
        body: PostSourcesSourceVerifyBody | Signal<PostSourcesSourceVerifyBody>,
      ) =>
        httpResource<PostSourcesSourceVerifyResponse>(() => ({
          url: `${base}/v1/sources/${source}/verify`,
          method: 'POST',
          body,
        }));
    },
  };
}
