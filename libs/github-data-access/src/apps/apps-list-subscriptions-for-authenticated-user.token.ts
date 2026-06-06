import { InjectionToken, inject, FactoryProvider } from '@angular/core';
import { httpResource } from '@angular/common/http';
import type { paths } from '../schema.d';
import { GITHUB_BASE_URL } from '../api-base-url.token';

export type AppsListSubscriptionsForAuthenticatedUserParams =
  paths['/user/marketplace_purchases']['get']['parameters']['query'];

export type AppsListSubscriptionsForAuthenticatedUserResponse =
  paths['/user/marketplace_purchases']['get']['responses']['200']['content']['application/json'];

export const APPS_LIST_SUBSCRIPTIONS_FOR_AUTHENTICATED_USER =
  new InjectionToken<
    (
      params?:
        | AppsListSubscriptionsForAuthenticatedUserParams
        | (() => AppsListSubscriptionsForAuthenticatedUserParams | undefined),
    ) => ReturnType<
      typeof httpResource<AppsListSubscriptionsForAuthenticatedUserResponse>
    >
  >('APPS_LIST_SUBSCRIPTIONS_FOR_AUTHENTICATED_USER');

export function provideAppsListSubscriptionsForAuthenticatedUser(): FactoryProvider {
  return {
    provide: APPS_LIST_SUBSCRIPTIONS_FOR_AUTHENTICATED_USER,
    useFactory: () => {
      const base = inject(GITHUB_BASE_URL);
      return (
        params?:
          | AppsListSubscriptionsForAuthenticatedUserParams
          | (() => AppsListSubscriptionsForAuthenticatedUserParams | undefined),
      ) =>
        httpResource<AppsListSubscriptionsForAuthenticatedUserResponse>(() => ({
          url: `${base}/user/marketplace_purchases`,
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
