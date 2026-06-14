import { InjectionToken, inject, FactoryProvider } from '@angular/core';
import { httpResource } from '@angular/common/http';
import type { paths } from '../schema.d';
import { GITHUB_BASE_URL } from '../api-base-url.token';

export type AppsCreateFromManifestResponse =
  paths['/app-manifests/{code}/conversions']['post']['responses']['201']['content']['application/json'];

export const APPS_CREATE_FROM_MANIFEST = new InjectionToken<
  (
    code: string,
  ) => ReturnType<typeof httpResource<AppsCreateFromManifestResponse>>
>('APPS_CREATE_FROM_MANIFEST');

export function provideAppsCreateFromManifest(): FactoryProvider {
  return {
    provide: APPS_CREATE_FROM_MANIFEST,
    useFactory: () => {
      const base = inject(GITHUB_BASE_URL);
      return (code: string) =>
        httpResource<AppsCreateFromManifestResponse>(() => ({
          url: `${base}/app-manifests/${code}/conversions`,
          method: 'POST',
        }));
    },
  };
}
