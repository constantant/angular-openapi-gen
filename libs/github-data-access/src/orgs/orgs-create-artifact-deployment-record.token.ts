import { InjectionToken, inject, Signal, FactoryProvider } from '@angular/core';
import { httpResource } from '@angular/common/http';
import type { paths } from '../schema.d';
import { GITHUB_BASE_URL } from '../api-base-url.token';

export type OrgsCreateArtifactDeploymentRecordBody = NonNullable<
  paths['/orgs/{org}/artifacts/metadata/deployment-record']['post']['requestBody']
>['content']['application/json'];

export type OrgsCreateArtifactDeploymentRecordResponse =
  paths['/orgs/{org}/artifacts/metadata/deployment-record']['post']['responses']['200']['content']['application/json'];

export const ORGS_CREATE_ARTIFACT_DEPLOYMENT_RECORD = new InjectionToken<
  (
    org: string,
    body:
      | OrgsCreateArtifactDeploymentRecordBody
      | Signal<OrgsCreateArtifactDeploymentRecordBody>,
  ) => ReturnType<
    typeof httpResource<OrgsCreateArtifactDeploymentRecordResponse>
  >
>('ORGS_CREATE_ARTIFACT_DEPLOYMENT_RECORD');

export function provideOrgsCreateArtifactDeploymentRecord(): FactoryProvider {
  return {
    provide: ORGS_CREATE_ARTIFACT_DEPLOYMENT_RECORD,
    useFactory: () => {
      const base = inject(GITHUB_BASE_URL);
      return (
        org: string,
        body:
          | OrgsCreateArtifactDeploymentRecordBody
          | Signal<OrgsCreateArtifactDeploymentRecordBody>,
      ) =>
        httpResource<OrgsCreateArtifactDeploymentRecordResponse>(() => ({
          url: `${base}/orgs/${org}/artifacts/metadata/deployment-record`,
          method: 'POST',
          body,
        }));
    },
  };
}
