import { InjectionToken, inject, Signal, FactoryProvider } from '@angular/core';
import { httpResource } from '@angular/common/http';
import type { paths } from '../schema.d';
import { GITHUB_BASE_URL } from '../api-base-url.token';

export type DependencyGraphCreateRepositorySnapshotBody = NonNullable<
  paths['/repos/{owner}/{repo}/dependency-graph/snapshots']['post']['requestBody']
>['content']['application/json'];

export type DependencyGraphCreateRepositorySnapshotResponse =
  paths['/repos/{owner}/{repo}/dependency-graph/snapshots']['post']['responses']['201']['content']['application/json'];

export const DEPENDENCY_GRAPH_CREATE_REPOSITORY_SNAPSHOT = new InjectionToken<
  (
    owner: string,
    repo: string,
    body:
      | DependencyGraphCreateRepositorySnapshotBody
      | Signal<DependencyGraphCreateRepositorySnapshotBody>,
  ) => ReturnType<
    typeof httpResource<DependencyGraphCreateRepositorySnapshotResponse>
  >
>('DEPENDENCY_GRAPH_CREATE_REPOSITORY_SNAPSHOT');

export function provideDependencyGraphCreateRepositorySnapshot(): FactoryProvider {
  return {
    provide: DEPENDENCY_GRAPH_CREATE_REPOSITORY_SNAPSHOT,
    useFactory: () => {
      const base = inject(GITHUB_BASE_URL);
      return (
        owner: string,
        repo: string,
        body:
          | DependencyGraphCreateRepositorySnapshotBody
          | Signal<DependencyGraphCreateRepositorySnapshotBody>,
      ) =>
        httpResource<DependencyGraphCreateRepositorySnapshotResponse>(() => ({
          url: `${base}/repos/${owner}/${repo}/dependency-graph/snapshots`,
          method: 'POST',
          body,
        }));
    },
  };
}
