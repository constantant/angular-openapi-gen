import { InjectionToken, inject, FactoryProvider } from '@angular/core';
import { httpResource } from '@angular/common/http';
import type { paths } from '../schema.d';
import { GITHUB_BASE_URL } from '../api-base-url.token';

export type OrgsListOutsideCollaboratorsParams =
  paths['/orgs/{org}/outside_collaborators']['get']['parameters']['query'];

export type OrgsListOutsideCollaboratorsResponse =
  paths['/orgs/{org}/outside_collaborators']['get']['responses']['200']['content']['application/json'];

export const ORGS_LIST_OUTSIDE_COLLABORATORS = new InjectionToken<
  (
    org: string,
    params?:
      | OrgsListOutsideCollaboratorsParams
      | (() => OrgsListOutsideCollaboratorsParams | undefined),
  ) => ReturnType<typeof httpResource<OrgsListOutsideCollaboratorsResponse>>
>('ORGS_LIST_OUTSIDE_COLLABORATORS');

export function provideOrgsListOutsideCollaborators(): FactoryProvider {
  return {
    provide: ORGS_LIST_OUTSIDE_COLLABORATORS,
    useFactory: () => {
      const base = inject(GITHUB_BASE_URL);
      return (
        org: string,
        params?:
          | OrgsListOutsideCollaboratorsParams
          | (() => OrgsListOutsideCollaboratorsParams | undefined),
      ) =>
        httpResource<OrgsListOutsideCollaboratorsResponse>(() => ({
          url: `${base}/orgs/${org}/outside_collaborators`,
          params: (typeof params === 'function'
            ? params()
            : params) as unknown as Record<
            string,
            string | number | boolean | readonly (string | number | boolean)[]
          >,
        }));
    },
  };
}
