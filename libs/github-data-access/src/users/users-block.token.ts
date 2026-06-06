import { InjectionToken, inject } from '@angular/core';
import { httpResource } from '@angular/common/http';
import type { paths } from '../schema.d';
import { GITHUB_BASE_URL } from '../api-base-url.token';

export const USERS_BLOCK = new InjectionToken<
  (username: string) => ReturnType<typeof httpResource<unknown>>
>('USERS_BLOCK', {
  providedIn: 'root',
  factory: () => {
    const base = inject(GITHUB_BASE_URL);
    return (username: string) =>
      httpResource<unknown>(() => ({
        url: `${base}/user/blocks/${username}`,
        method: 'PUT',
      }));
  },
});
