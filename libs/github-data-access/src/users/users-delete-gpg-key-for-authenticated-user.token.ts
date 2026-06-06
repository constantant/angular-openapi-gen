import { InjectionToken, inject } from '@angular/core';
import { httpResource } from '@angular/common/http';
import type { paths } from '../schema.d';
import { GITHUB_BASE_URL } from '../api-base-url.token';

export const USERS_DELETE_GPG_KEY_FOR_AUTHENTICATED_USER = new InjectionToken<
  (gpgKeyId: string) => ReturnType<typeof httpResource<unknown>>
>('USERS_DELETE_GPG_KEY_FOR_AUTHENTICATED_USER', {
  providedIn: 'root',
  factory: () => {
    const base = inject(GITHUB_BASE_URL);
    return (gpgKeyId: string) =>
      httpResource<unknown>(() => ({
        url: `${base}/user/gpg_keys/${gpgKeyId}`,
        method: 'DELETE',
      }));
  },
});
