import { InjectionToken, inject, FactoryProvider } from '@angular/core';
import { httpResource } from '@angular/common/http';
import type { paths } from '../schema.d';
import { GITHUB_BASE_URL } from '../api-base-url.token';

export type DependencyGraphGenerateSbomReportResponse =
  paths['/repos/{owner}/{repo}/dependency-graph/sbom/generate-report']['get']['responses']['201']['content']['application/json'];

export const DEPENDENCY_GRAPH_GENERATE_SBOM_REPORT = new InjectionToken<
  (
    owner: string,
    repo: string,
  ) => ReturnType<
    typeof httpResource<DependencyGraphGenerateSbomReportResponse>
  >
>('DEPENDENCY_GRAPH_GENERATE_SBOM_REPORT');

export function provideDependencyGraphGenerateSbomReport(): FactoryProvider {
  return {
    provide: DEPENDENCY_GRAPH_GENERATE_SBOM_REPORT,
    useFactory: () => {
      const base = inject(GITHUB_BASE_URL);
      return (owner: string, repo: string) =>
        httpResource<DependencyGraphGenerateSbomReportResponse>(() => ({
          url: `${base}/repos/${owner}/${repo}/dependency-graph/sbom/generate-report`,
        }));
    },
  };
}
