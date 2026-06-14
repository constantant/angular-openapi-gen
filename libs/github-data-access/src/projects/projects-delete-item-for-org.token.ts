import { InjectionToken, inject, FactoryProvider } from '@angular/core';
import { httpResource } from '@angular/common/http';
import type { paths } from '../schema.d';
import { GITHUB_BASE_URL } from '../api-base-url.token';

export const PROJECTS_DELETE_ITEM_FOR_ORG = new InjectionToken<
  (
    projectNumber: string,
    org: string,
    itemId: string,
  ) => ReturnType<typeof httpResource<unknown>>
>('PROJECTS_DELETE_ITEM_FOR_ORG');

export function provideProjectsDeleteItemForOrg(): FactoryProvider {
  return {
    provide: PROJECTS_DELETE_ITEM_FOR_ORG,
    useFactory: () => {
      const base = inject(GITHUB_BASE_URL);
      return (projectNumber: string, org: string, itemId: string) =>
        httpResource<unknown>(() => ({
          url: `${base}/orgs/${org}/projectsV2/${projectNumber}/items/${itemId}`,
          method: 'DELETE',
        }));
    },
  };
}
