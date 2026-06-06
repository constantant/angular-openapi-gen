import { InjectionToken, inject, Signal, FactoryProvider } from '@angular/core';
import { httpResource } from '@angular/common/http';
import type { paths } from '../schema.d';
import { GITHUB_BASE_URL } from '../api-base-url.token';

export type ReposCreateForAuthenticatedUserBody = NonNullable<
  paths['/user/repos']['post']['requestBody']
>['content']['application/json'];

export type ReposCreateForAuthenticatedUserResponse =
  paths['/user/repos']['post']['responses']['201']['content']['application/json'];

export const REPOS_CREATE_FOR_AUTHENTICATED_USER = new InjectionToken<
  (
    body:
      | ReposCreateForAuthenticatedUserBody
      | Signal<ReposCreateForAuthenticatedUserBody>,
  ) => ReturnType<typeof httpResource<ReposCreateForAuthenticatedUserResponse>>
>('REPOS_CREATE_FOR_AUTHENTICATED_USER');

export function provideReposCreateForAuthenticatedUser(): FactoryProvider {
  return {
    provide: REPOS_CREATE_FOR_AUTHENTICATED_USER,
    useFactory: () => {
      const base = inject(GITHUB_BASE_URL);
      return (
        body:
          | ReposCreateForAuthenticatedUserBody
          | Signal<ReposCreateForAuthenticatedUserBody>,
      ) =>
        httpResource<ReposCreateForAuthenticatedUserResponse>(() => ({
          url: `${base}/user/repos`,
          method: 'POST',
          body,
        }));
    },
  };
}
