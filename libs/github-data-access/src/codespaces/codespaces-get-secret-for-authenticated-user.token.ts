import { InjectionToken, inject } from '@angular/core';
import { httpResource } from '@angular/common/http';
import type { paths } from '../schema.d';
import { GITHUB_BASE_URL } from '../api-base-url.token';

export type CodespacesGetSecretForAuthenticatedUserResponse =
  paths['/user/codespaces/secrets/{secret_name}']['get']['responses']['200']['content']['application/json'];

export const CODESPACES_GET_SECRET_FOR_AUTHENTICATED_USER = new InjectionToken<
  (
    secretName: string,
  ) => ReturnType<
    typeof httpResource<CodespacesGetSecretForAuthenticatedUserResponse>
  >
>('CODESPACES_GET_SECRET_FOR_AUTHENTICATED_USER', {
  providedIn: 'root',
  factory: () => {
    const base = inject(GITHUB_BASE_URL);
    return (secretName: string) =>
      httpResource<CodespacesGetSecretForAuthenticatedUserResponse>(() => ({
        url: `${base}/user/codespaces/secrets/${secretName}`,
      }));
  },
});
