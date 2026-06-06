import { InjectionToken, inject } from '@angular/core';
import { httpResource } from '@angular/common/http';
import type { paths } from '../schema.d';
import { GITHUB_BASE_URL } from '../api-base-url.token';

export type CodespacesGetPublicKeyForAuthenticatedUserResponse =
  paths['/user/codespaces/secrets/public-key']['get']['responses']['200']['content']['application/json'];

export const CODESPACES_GET_PUBLIC_KEY_FOR_AUTHENTICATED_USER =
  new InjectionToken<
    () => ReturnType<
      typeof httpResource<CodespacesGetPublicKeyForAuthenticatedUserResponse>
    >
  >('CODESPACES_GET_PUBLIC_KEY_FOR_AUTHENTICATED_USER', {
    providedIn: 'root',
    factory: () => {
      const base = inject(GITHUB_BASE_URL);
      return () =>
        httpResource<CodespacesGetPublicKeyForAuthenticatedUserResponse>(
          () => ({
            url: `${base}/user/codespaces/secrets/public-key`,
          }),
        );
    },
  });
