import { InjectionToken, inject, Signal, FactoryProvider } from '@angular/core';
import { httpResource } from '@angular/common/http';
import type { paths } from '../schema.d';
import { GITHUB_BASE_URL } from '../api-base-url.token';

export type ReposCustomPropertiesForReposCreateOrUpdateRepositoryValuesBody =
  NonNullable<
    paths['/repos/{owner}/{repo}/properties/values']['patch']['requestBody']
  >['content']['application/json'];

export const REPOS_CUSTOM_PROPERTIES_FOR_REPOS_CREATE_OR_UPDATE_REPOSITORY_VALUES =
  new InjectionToken<
    (
      owner: string,
      repo: string,
      body:
        | ReposCustomPropertiesForReposCreateOrUpdateRepositoryValuesBody
        | Signal<ReposCustomPropertiesForReposCreateOrUpdateRepositoryValuesBody>,
    ) => ReturnType<typeof httpResource<unknown>>
  >('REPOS_CUSTOM_PROPERTIES_FOR_REPOS_CREATE_OR_UPDATE_REPOSITORY_VALUES');

export function provideReposCustomPropertiesForReposCreateOrUpdateRepositoryValues(): FactoryProvider {
  return {
    provide:
      REPOS_CUSTOM_PROPERTIES_FOR_REPOS_CREATE_OR_UPDATE_REPOSITORY_VALUES,
    useFactory: () => {
      const base = inject(GITHUB_BASE_URL);
      return (
        owner: string,
        repo: string,
        body:
          | ReposCustomPropertiesForReposCreateOrUpdateRepositoryValuesBody
          | Signal<ReposCustomPropertiesForReposCreateOrUpdateRepositoryValuesBody>,
      ) =>
        httpResource<unknown>(() => ({
          url: `${base}/repos/${owner}/${repo}/properties/values`,
          method: 'PATCH',
          body,
        }));
    },
  };
}
