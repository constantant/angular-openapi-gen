import { InjectionToken, inject, Signal, FactoryProvider } from '@angular/core';
import { httpResource } from '@angular/common/http';
import type { paths } from '../schema.d';
import { GITHUB_BASE_URL } from '../api-base-url.token';

export type ProjectsCreateDraftItemForOrgBody = NonNullable<
  paths['/orgs/{org}/projectsV2/{project_number}/drafts']['post']['requestBody']
>['content']['application/json'];

export type ProjectsCreateDraftItemForOrgResponse =
  paths['/orgs/{org}/projectsV2/{project_number}/drafts']['post']['responses']['201']['content']['application/json'];

export const PROJECTS_CREATE_DRAFT_ITEM_FOR_ORG = new InjectionToken<
  (
    org: string,
    projectNumber: string,
    body:
      | ProjectsCreateDraftItemForOrgBody
      | Signal<ProjectsCreateDraftItemForOrgBody>,
  ) => ReturnType<typeof httpResource<ProjectsCreateDraftItemForOrgResponse>>
>('PROJECTS_CREATE_DRAFT_ITEM_FOR_ORG');

export function provideProjectsCreateDraftItemForOrg(): FactoryProvider {
  return {
    provide: PROJECTS_CREATE_DRAFT_ITEM_FOR_ORG,
    useFactory: () => {
      const base = inject(GITHUB_BASE_URL);
      return (
        org: string,
        projectNumber: string,
        body:
          | ProjectsCreateDraftItemForOrgBody
          | Signal<ProjectsCreateDraftItemForOrgBody>,
      ) =>
        httpResource<ProjectsCreateDraftItemForOrgResponse>(() => ({
          url: `${base}/orgs/${org}/projectsV2/${projectNumber}/drafts`,
          method: 'POST',
          body,
        }));
    },
  };
}
