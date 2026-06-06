import { InjectionToken, inject } from '@angular/core';
import { httpResource } from '@angular/common/http';
import type { paths } from '../schema.d';
import { GITHUB_BASE_URL } from '../api-base-url.token';

export const INTERACTIONS_REMOVE_RESTRICTIONS_FOR_AUTHENTICATED_USER =
  new InjectionToken<() => ReturnType<typeof httpResource<unknown>>>(
    'INTERACTIONS_REMOVE_RESTRICTIONS_FOR_AUTHENTICATED_USER',
    {
      providedIn: 'root',
      factory: () => {
        const base = inject(GITHUB_BASE_URL);
        return () =>
          httpResource<unknown>(() => ({
            url: `${base}/user/interaction-limits`,
            method: 'DELETE',
          }));
      },
    },
  );
