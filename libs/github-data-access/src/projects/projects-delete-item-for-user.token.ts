import { InjectionToken, inject } from '@angular/core';
import { httpResource } from '@angular/common/http';
import type { paths } from '../schema.d';
import { GITHUB_BASE_URL } from '../api-base-url.token';

export const PROJECTS_DELETE_ITEM_FOR_USER = new InjectionToken<
  (
    projectNumber: string,
    username: string,
    itemId: string,
  ) => ReturnType<typeof httpResource<unknown>>
>('PROJECTS_DELETE_ITEM_FOR_USER', {
  providedIn: 'root',
  factory: () => {
    const base = inject(GITHUB_BASE_URL);
    return (projectNumber: string, username: string, itemId: string) =>
      httpResource<unknown>(() => ({
        url: `${base}/users/${username}/projectsV2/${projectNumber}/items/${itemId}`,
        method: 'DELETE',
      }));
  },
});
