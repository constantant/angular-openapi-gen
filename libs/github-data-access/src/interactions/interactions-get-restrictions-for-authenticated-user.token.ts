import { InjectionToken, inject, FactoryProvider } from '@angular/core';
import { httpResource } from '@angular/common/http';
import type { paths } from '../schema.d';
import { GITHUB_BASE_URL } from '../api-base-url.token';

export type InteractionsGetRestrictionsForAuthenticatedUserResponse =
  paths['/user/interaction-limits']['get']['responses']['200']['content']['application/json'];

export const INTERACTIONS_GET_RESTRICTIONS_FOR_AUTHENTICATED_USER =
  new InjectionToken<
    () => ReturnType<
      typeof httpResource<InteractionsGetRestrictionsForAuthenticatedUserResponse>
    >
  >('INTERACTIONS_GET_RESTRICTIONS_FOR_AUTHENTICATED_USER');

export function provideInteractionsGetRestrictionsForAuthenticatedUser(): FactoryProvider {
  return {
    provide: INTERACTIONS_GET_RESTRICTIONS_FOR_AUTHENTICATED_USER,
    useFactory: () => {
      const base = inject(GITHUB_BASE_URL);
      return () =>
        httpResource<InteractionsGetRestrictionsForAuthenticatedUserResponse>(
          () => ({
            url: `${base}/user/interaction-limits`,
          }),
        );
    },
  };
}
