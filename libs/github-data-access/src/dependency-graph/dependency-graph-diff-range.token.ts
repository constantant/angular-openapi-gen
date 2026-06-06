import { InjectionToken, inject, FactoryProvider } from '@angular/core';
import { httpResource } from '@angular/common/http';
import type { paths } from '../schema.d';
import { GITHUB_BASE_URL } from '../api-base-url.token';

export type DependencyGraphDiffRangeParams =
  paths['/repos/{owner}/{repo}/dependency-graph/compare/{basehead}']['get']['parameters']['query'];

export type DependencyGraphDiffRangeResponse =
  paths['/repos/{owner}/{repo}/dependency-graph/compare/{basehead}']['get']['responses']['200']['content']['application/json'];

export const DEPENDENCY_GRAPH_DIFF_RANGE = new InjectionToken<
  (
    owner: string,
    repo: string,
    basehead: string,
    params?:
      | DependencyGraphDiffRangeParams
      | (() => DependencyGraphDiffRangeParams | undefined),
  ) => ReturnType<typeof httpResource<DependencyGraphDiffRangeResponse>>
>('DEPENDENCY_GRAPH_DIFF_RANGE');

export function provideDependencyGraphDiffRange(): FactoryProvider {
  return {
    provide: DEPENDENCY_GRAPH_DIFF_RANGE,
    useFactory: () => {
      const base = inject(GITHUB_BASE_URL);
      return (
        owner: string,
        repo: string,
        basehead: string,
        params?:
          | DependencyGraphDiffRangeParams
          | (() => DependencyGraphDiffRangeParams | undefined),
      ) =>
        httpResource<DependencyGraphDiffRangeResponse>(() => ({
          url: `${base}/repos/${owner}/${repo}/dependency-graph/compare/${basehead}`,
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
