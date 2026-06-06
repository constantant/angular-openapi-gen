import { InjectionToken, inject, Signal, FactoryProvider } from '@angular/core';
import { httpResource } from '@angular/common/http';
import type { paths } from '../schema.d';
import { GITHUB_BASE_URL } from '../api-base-url.token';

export type OrgsSetClusterDeploymentRecordsBody = NonNullable<
  paths['/orgs/{org}/artifacts/metadata/deployment-record/cluster/{cluster}']['post']['requestBody']
>['content']['application/json'];

export type OrgsSetClusterDeploymentRecordsResponse =
  paths['/orgs/{org}/artifacts/metadata/deployment-record/cluster/{cluster}']['post']['responses']['200']['content']['application/json'];

export const ORGS_SET_CLUSTER_DEPLOYMENT_RECORDS = new InjectionToken<
  (
    org: string,
    cluster: string,
    body:
      | OrgsSetClusterDeploymentRecordsBody
      | Signal<OrgsSetClusterDeploymentRecordsBody>,
  ) => ReturnType<typeof httpResource<OrgsSetClusterDeploymentRecordsResponse>>
>('ORGS_SET_CLUSTER_DEPLOYMENT_RECORDS');

export function provideOrgsSetClusterDeploymentRecords(): FactoryProvider {
  return {
    provide: ORGS_SET_CLUSTER_DEPLOYMENT_RECORDS,
    useFactory: () => {
      const base = inject(GITHUB_BASE_URL);
      return (
        org: string,
        cluster: string,
        body:
          | OrgsSetClusterDeploymentRecordsBody
          | Signal<OrgsSetClusterDeploymentRecordsBody>,
      ) =>
        httpResource<OrgsSetClusterDeploymentRecordsResponse>(() => ({
          url: `${base}/orgs/${org}/artifacts/metadata/deployment-record/cluster/${cluster}`,
          method: 'POST',
          body,
        }));
    },
  };
}
