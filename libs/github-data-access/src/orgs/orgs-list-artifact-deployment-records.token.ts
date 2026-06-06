import { InjectionToken, inject } from '@angular/core';
import { httpResource } from '@angular/common/http';
import type { paths } from '../schema.d';
import { GITHUB_BASE_URL } from '../api-base-url.token';

export type OrgsListArtifactDeploymentRecordsResponse =
  paths['/orgs/{org}/artifacts/{subject_digest}/metadata/deployment-records']['get']['responses']['200']['content']['application/json'];

export const ORGS_LIST_ARTIFACT_DEPLOYMENT_RECORDS = new InjectionToken<
  (
    org: string,
    subjectDigest: string,
  ) => ReturnType<
    typeof httpResource<OrgsListArtifactDeploymentRecordsResponse>
  >
>('ORGS_LIST_ARTIFACT_DEPLOYMENT_RECORDS', {
  providedIn: 'root',
  factory: () => {
    const base = inject(GITHUB_BASE_URL);
    return (org: string, subjectDigest: string) =>
      httpResource<OrgsListArtifactDeploymentRecordsResponse>(() => ({
        url: `${base}/orgs/${org}/artifacts/${subjectDigest}/metadata/deployment-records`,
      }));
  },
});
