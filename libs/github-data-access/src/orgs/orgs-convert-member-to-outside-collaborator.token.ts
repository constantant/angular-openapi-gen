import { InjectionToken, inject, Signal, FactoryProvider } from '@angular/core';
import { httpResource } from '@angular/common/http';
import type { paths } from '../schema.d';
import { GITHUB_BASE_URL } from '../api-base-url.token';

export type OrgsConvertMemberToOutsideCollaboratorBody = NonNullable<
  paths['/orgs/{org}/outside_collaborators/{username}']['put']['requestBody']
>['content']['application/json'];

export const ORGS_CONVERT_MEMBER_TO_OUTSIDE_COLLABORATOR = new InjectionToken<
  (
    org: string,
    username: string,
    body:
      | OrgsConvertMemberToOutsideCollaboratorBody
      | Signal<OrgsConvertMemberToOutsideCollaboratorBody>,
  ) => ReturnType<typeof httpResource<unknown>>
>('ORGS_CONVERT_MEMBER_TO_OUTSIDE_COLLABORATOR');

export function provideOrgsConvertMemberToOutsideCollaborator(): FactoryProvider {
  return {
    provide: ORGS_CONVERT_MEMBER_TO_OUTSIDE_COLLABORATOR,
    useFactory: () => {
      const base = inject(GITHUB_BASE_URL);
      return (
        org: string,
        username: string,
        body:
          | OrgsConvertMemberToOutsideCollaboratorBody
          | Signal<OrgsConvertMemberToOutsideCollaboratorBody>,
      ) =>
        httpResource<unknown>(() => ({
          url: `${base}/orgs/${org}/outside_collaborators/${username}`,
          method: 'PUT',
          body,
        }));
    },
  };
}
