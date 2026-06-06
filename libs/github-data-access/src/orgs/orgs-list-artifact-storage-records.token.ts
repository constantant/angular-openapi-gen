import { InjectionToken, inject, FactoryProvider } from '@angular/core';
import { httpResource } from '@angular/common/http';
import type { paths } from '../schema.d';
import { GITHUB_BASE_URL } from '../api-base-url.token';

export type OrgsListArtifactStorageRecordsResponse =
  paths['/orgs/{org}/artifacts/{subject_digest}/metadata/storage-records']['get']['responses']['200']['content']['application/json'];

export const ORGS_LIST_ARTIFACT_STORAGE_RECORDS = new InjectionToken<
  (
    org: string,
    subjectDigest: string,
  ) => ReturnType<typeof httpResource<OrgsListArtifactStorageRecordsResponse>>
>('ORGS_LIST_ARTIFACT_STORAGE_RECORDS');

export function provideOrgsListArtifactStorageRecords(): FactoryProvider {
  return {
    provide: ORGS_LIST_ARTIFACT_STORAGE_RECORDS,
    useFactory: () => {
      const base = inject(GITHUB_BASE_URL);
      return (org: string, subjectDigest: string) =>
        httpResource<OrgsListArtifactStorageRecordsResponse>(() => ({
          url: `${base}/orgs/${org}/artifacts/${subjectDigest}/metadata/storage-records`,
        }));
    },
  };
}
