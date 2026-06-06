import { InjectionToken, inject } from '@angular/core';
import { httpResource } from '@angular/common/http';
import { GITHUB_BASE_URL } from '../api-base-url.token';

export const LIST_REPOS = new InjectionToken<
  (username?: string) => ReturnType<typeof httpResource<unknown[]>>
>('LIST_REPOS', {
  providedIn: 'root',
  factory: () => {
    const base = inject(GITHUB_BASE_URL);
    return (username = 'angular') =>
      httpResource<unknown[]>(() => ({
        url: `${base}/users/${username}/repos`,
        params: { per_page: '10', sort: 'stars' },
      }));
  },
});
