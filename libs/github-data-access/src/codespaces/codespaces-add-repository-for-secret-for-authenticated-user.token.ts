import { InjectionToken, inject } from '@angular/core';
import { httpResource } from '@angular/common/http';
import type { paths } from '../schema.d';
import { GITHUB_BASE_URL } from '../api-base-url.token';

export const CODESPACES_ADD_REPOSITORY_FOR_SECRET_FOR_AUTHENTICATED_USER =
  new InjectionToken<
    (
      secretName: string,
      repositoryId: string,
    ) => ReturnType<typeof httpResource<unknown>>
  >('CODESPACES_ADD_REPOSITORY_FOR_SECRET_FOR_AUTHENTICATED_USER', {
    providedIn: 'root',
    factory: () => {
      const base = inject(GITHUB_BASE_URL);
      return (secretName: string, repositoryId: string) =>
        httpResource<unknown>(() => ({
          url: `${base}/user/codespaces/secrets/${secretName}/repositories/${repositoryId}`,
          method: 'PUT',
        }));
    },
  });
