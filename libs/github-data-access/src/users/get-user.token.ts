import { InjectionToken, inject } from '@angular/core';
import { httpResource } from '@angular/common/http';
import { GITHUB_BASE_URL } from '../api-base-url.token';

export const GET_USER = new InjectionToken<
  (username?: string) => ReturnType<typeof httpResource<unknown>>
>('GET_USER', {
  providedIn: 'root',
  factory: () => {
    const base = inject(GITHUB_BASE_URL);
    return (username = 'angular') =>
      httpResource<unknown>(() => ({ url: `${base}/users/${username}` }));
  },
});
