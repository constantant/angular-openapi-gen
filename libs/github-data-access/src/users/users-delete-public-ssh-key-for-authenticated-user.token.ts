import { InjectionToken, inject } from '@angular/core';
import { httpResource } from '@angular/common/http';
import type { paths } from '../schema.d';
import { GITHUB_BASE_URL } from '../api-base-url.token';

export const USERS_DELETE_PUBLIC_SSH_KEY_FOR_AUTHENTICATED_USER =
  new InjectionToken<
    (key_id: string) => ReturnType<typeof httpResource<unknown>>
  >('USERS_DELETE_PUBLIC_SSH_KEY_FOR_AUTHENTICATED_USER', {
    providedIn: 'root',
    factory: () => {
      const base = inject(GITHUB_BASE_URL);
      return (key_id: string) =>
        httpResource<unknown>(() => ({
          url: `${base}/user/keys/${key_id}`,
          method: 'DELETE',
        }));
    },
  });
