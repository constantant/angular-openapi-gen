import { InjectionToken, inject, Signal, FactoryProvider } from '@angular/core';
import { httpResource } from '@angular/common/http';
import type { paths } from '../schema.d';
import { GITHUB_BASE_URL } from '../api-base-url.token';

export type CodespacesSetCodespacesAccessBody = NonNullable<
  paths['/orgs/{org}/codespaces/access']['put']['requestBody']
>['content']['application/json'];

export const CODESPACES_SET_CODESPACES_ACCESS = new InjectionToken<
  (
    org: string,
    body:
      | CodespacesSetCodespacesAccessBody
      | Signal<CodespacesSetCodespacesAccessBody>,
  ) => ReturnType<typeof httpResource<unknown>>
>('CODESPACES_SET_CODESPACES_ACCESS');

export function provideCodespacesSetCodespacesAccess(): FactoryProvider {
  return {
    provide: CODESPACES_SET_CODESPACES_ACCESS,
    useFactory: () => {
      const base = inject(GITHUB_BASE_URL);
      return (
        org: string,
        body:
          | CodespacesSetCodespacesAccessBody
          | Signal<CodespacesSetCodespacesAccessBody>,
      ) =>
        httpResource<unknown>(() => ({
          url: `${base}/orgs/${org}/codespaces/access`,
          method: 'PUT',
          body,
        }));
    },
  };
}
