import { InjectionToken, inject, Signal } from '@angular/core';
import { httpResource } from '@angular/common/http';
import type { paths } from '../schema.d';
import { GITHUB_BASE_URL } from '../api-base-url.token';

export type MigrationsSetLfsPreferenceBody = NonNullable<
  paths['/repos/{owner}/{repo}/import/lfs']['patch']['requestBody']
>['content']['application/json'];

export type MigrationsSetLfsPreferenceResponse =
  paths['/repos/{owner}/{repo}/import/lfs']['patch']['responses']['200']['content']['application/json'];

export const MIGRATIONS_SET_LFS_PREFERENCE = new InjectionToken<
  (
    owner: string,
    repo: string,
    body:
      | MigrationsSetLfsPreferenceBody
      | Signal<MigrationsSetLfsPreferenceBody>,
  ) => ReturnType<typeof httpResource<MigrationsSetLfsPreferenceResponse>>
>('MIGRATIONS_SET_LFS_PREFERENCE', {
  providedIn: 'root',
  factory: () => {
    const base = inject(GITHUB_BASE_URL);
    return (
      owner: string,
      repo: string,
      body:
        | MigrationsSetLfsPreferenceBody
        | Signal<MigrationsSetLfsPreferenceBody>,
    ) =>
      httpResource<MigrationsSetLfsPreferenceResponse>(() => ({
        url: `${base}/repos/${owner}/${repo}/import/lfs`,
        method: 'PATCH',
        body,
      }));
  },
});
