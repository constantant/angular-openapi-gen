import { InjectionToken, inject, Signal, FactoryProvider } from '@angular/core';
import { httpResource } from '@angular/common/http';
import type { paths } from '../schema.d';
import { GITHUB_BASE_URL } from '../api-base-url.token';

export type CodespacesCreateForAuthenticatedUserBody = NonNullable<
  paths['/user/codespaces']['post']['requestBody']
>['content']['application/json'];

export type CodespacesCreateForAuthenticatedUserResponse =
  paths['/user/codespaces']['post']['responses']['201']['content']['application/json'];

export const CODESPACES_CREATE_FOR_AUTHENTICATED_USER = new InjectionToken<
  (
    body:
      | CodespacesCreateForAuthenticatedUserBody
      | Signal<CodespacesCreateForAuthenticatedUserBody>,
  ) => ReturnType<
    typeof httpResource<CodespacesCreateForAuthenticatedUserResponse>
  >
>('CODESPACES_CREATE_FOR_AUTHENTICATED_USER');

export function provideCodespacesCreateForAuthenticatedUser(): FactoryProvider {
  return {
    provide: CODESPACES_CREATE_FOR_AUTHENTICATED_USER,
    useFactory: () => {
      const base = inject(GITHUB_BASE_URL);
      return (
        body:
          | CodespacesCreateForAuthenticatedUserBody
          | Signal<CodespacesCreateForAuthenticatedUserBody>,
      ) =>
        httpResource<CodespacesCreateForAuthenticatedUserResponse>(() => ({
          url: `${base}/user/codespaces`,
          method: 'POST',
          body,
        }));
    },
  };
}
