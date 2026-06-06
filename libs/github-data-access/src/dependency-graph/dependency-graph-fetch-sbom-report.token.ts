import { InjectionToken, inject } from '@angular/core';
import { httpResource } from '@angular/common/http';
import type { paths } from '../schema.d';
import { GITHUB_BASE_URL } from '../api-base-url.token';

export const DEPENDENCY_GRAPH_FETCH_SBOM_REPORT = new InjectionToken<
  (
    owner: string,
    repo: string,
    sbomUuid: string,
  ) => ReturnType<typeof httpResource<unknown>>
>('DEPENDENCY_GRAPH_FETCH_SBOM_REPORT', {
  providedIn: 'root',
  factory: () => {
    const base = inject(GITHUB_BASE_URL);
    return (owner: string, repo: string, sbomUuid: string) =>
      httpResource<unknown>(() => ({
        url: `${base}/repos/${owner}/${repo}/dependency-graph/sbom/fetch-report/${sbomUuid}`,
      }));
  },
});
