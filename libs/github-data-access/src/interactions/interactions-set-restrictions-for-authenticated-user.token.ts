import { InjectionToken, inject, Signal, FactoryProvider } from '@angular/core';
import { httpResource } from '@angular/common/http';
import type { paths } from '../schema.d';
import { GITHUB_BASE_URL } from '../api-base-url.token';

export type InteractionsSetRestrictionsForAuthenticatedUserBody = NonNullable<
  paths['/user/interaction-limits']['put']['requestBody']
>['content']['application/json'];

export type InteractionsSetRestrictionsForAuthenticatedUserResponse =
  paths['/user/interaction-limits']['put']['responses']['200']['content']['application/json'];

export const INTERACTIONS_SET_RESTRICTIONS_FOR_AUTHENTICATED_USER =
  new InjectionToken<
    (
      body:
        | InteractionsSetRestrictionsForAuthenticatedUserBody
        | Signal<InteractionsSetRestrictionsForAuthenticatedUserBody>,
    ) => ReturnType<
      typeof httpResource<InteractionsSetRestrictionsForAuthenticatedUserResponse>
    >
  >('INTERACTIONS_SET_RESTRICTIONS_FOR_AUTHENTICATED_USER');

export function provideInteractionsSetRestrictionsForAuthenticatedUser(): FactoryProvider {
  return {
    provide: INTERACTIONS_SET_RESTRICTIONS_FOR_AUTHENTICATED_USER,
    useFactory: () => {
      const base = inject(GITHUB_BASE_URL);
      return (
        body:
          | InteractionsSetRestrictionsForAuthenticatedUserBody
          | Signal<InteractionsSetRestrictionsForAuthenticatedUserBody>,
      ) =>
        httpResource<InteractionsSetRestrictionsForAuthenticatedUserResponse>(
          () => ({
            url: `${base}/user/interaction-limits`,
            method: 'PUT',
            body,
          }),
        );
    },
  };
}
