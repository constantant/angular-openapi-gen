import { InjectionToken, inject, Signal, FactoryProvider } from '@angular/core';
import { httpResource } from '@angular/common/http';
import type { paths } from '../schema.d';
import { GITHUB_BASE_URL } from '../api-base-url.token';

export type OrgsCreateArtifactStorageRecordBody = NonNullable<
  paths['/orgs/{org}/artifacts/metadata/storage-record']['post']['requestBody']
>['content']['application/json'];

export type OrgsCreateArtifactStorageRecordResponse =
  paths['/orgs/{org}/artifacts/metadata/storage-record']['post']['responses']['200']['content']['application/json'];

export const ORGS_CREATE_ARTIFACT_STORAGE_RECORD = new InjectionToken<
  (
    org: string,
    body:
      | OrgsCreateArtifactStorageRecordBody
      | Signal<OrgsCreateArtifactStorageRecordBody>,
  ) => ReturnType<typeof httpResource<OrgsCreateArtifactStorageRecordResponse>>
>('ORGS_CREATE_ARTIFACT_STORAGE_RECORD');

export function provideOrgsCreateArtifactStorageRecord(): FactoryProvider {
  return {
    provide: ORGS_CREATE_ARTIFACT_STORAGE_RECORD,
    useFactory: () => {
      const base = inject(GITHUB_BASE_URL);
      return (
        org: string,
        body:
          | OrgsCreateArtifactStorageRecordBody
          | Signal<OrgsCreateArtifactStorageRecordBody>,
      ) =>
        httpResource<OrgsCreateArtifactStorageRecordResponse>(() => ({
          url: `${base}/orgs/${org}/artifacts/metadata/storage-record`,
          method: 'POST',
          body,
        }));
    },
  };
}
