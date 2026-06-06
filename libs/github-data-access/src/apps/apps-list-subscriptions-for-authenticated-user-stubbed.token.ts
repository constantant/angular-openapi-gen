import { InjectionToken, inject, FactoryProvider } from '@angular/core';
import { httpResource } from '@angular/common/http';
import type { paths } from '../schema.d';
import { GITHUB_BASE_URL } from '../api-base-url.token';

export type AppsListSubscriptionsForAuthenticatedUserStubbedParams =
  paths['/user/marketplace_purchases/stubbed']['get']['parameters']['query'];

export type AppsListSubscriptionsForAuthenticatedUserStubbedResponse =
  paths['/user/marketplace_purchases/stubbed']['get']['responses']['200']['content']['application/json'];

export const APPS_LIST_SUBSCRIPTIONS_FOR_AUTHENTICATED_USER_STUBBED =
  new InjectionToken<
    (
      params?:
        | AppsListSubscriptionsForAuthenticatedUserStubbedParams
        | (() =>
            | AppsListSubscriptionsForAuthenticatedUserStubbedParams
            | undefined),
    ) => ReturnType<
      typeof httpResource<AppsListSubscriptionsForAuthenticatedUserStubbedResponse>
    >
  >('APPS_LIST_SUBSCRIPTIONS_FOR_AUTHENTICATED_USER_STUBBED');

export function provideAppsListSubscriptionsForAuthenticatedUserStubbed(): FactoryProvider {
  return {
    provide: APPS_LIST_SUBSCRIPTIONS_FOR_AUTHENTICATED_USER_STUBBED,
    useFactory: () => {
      const base = inject(GITHUB_BASE_URL);
      return (
        params?:
          | AppsListSubscriptionsForAuthenticatedUserStubbedParams
          | (() =>
              | AppsListSubscriptionsForAuthenticatedUserStubbedParams
              | undefined),
      ) =>
        httpResource<AppsListSubscriptionsForAuthenticatedUserStubbedResponse>(
          () => ({
            url: `${base}/user/marketplace_purchases/stubbed`,
            params: (typeof params === 'function'
              ? params()
              : params) as unknown as Record<
              string,
              string | number | boolean | readonly (string | number | boolean)[]
            >,
          }),
        );
    },
  };
}
