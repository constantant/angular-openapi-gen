import { InjectionToken, inject, FactoryProvider } from '@angular/core';
import { httpResource } from '@angular/common/http';
import type { paths } from '../schema.d';
import { GITHUB_BASE_URL } from '../api-base-url.token';

export const CODESPACES_DELETE_FOR_AUTHENTICATED_USER = new InjectionToken<
  (codespaceName: string) => ReturnType<typeof httpResource<unknown>>
>('CODESPACES_DELETE_FOR_AUTHENTICATED_USER');

export function provideCodespacesDeleteForAuthenticatedUser(): FactoryProvider {
  return {
    provide: CODESPACES_DELETE_FOR_AUTHENTICATED_USER,
    useFactory: () => {
      const base = inject(GITHUB_BASE_URL);
      return (codespaceName: string) =>
        httpResource<unknown>(() => ({
          url: `${base}/user/codespaces/${codespaceName}`,
          method: 'DELETE',
        }));
    },
  };
}
