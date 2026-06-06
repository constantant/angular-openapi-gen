import { InjectionToken, inject } from '@angular/core';
import { httpResource } from '@angular/common/http';
import type { paths } from '../schema.d';
import { GITHUB_BASE_URL } from '../api-base-url.token';

export type GistsGetRevisionResponse =
  paths['/gists/{gist_id}/{sha}']['get']['responses']['200']['content']['application/json'];

export const GISTS_GET_REVISION = new InjectionToken<
  (
    gistId: string,
    sha: string,
  ) => ReturnType<typeof httpResource<GistsGetRevisionResponse>>
>('GISTS_GET_REVISION', {
  providedIn: 'root',
  factory: () => {
    const base = inject(GITHUB_BASE_URL);
    return (gistId: string, sha: string) =>
      httpResource<GistsGetRevisionResponse>(() => ({
        url: `${base}/gists/${gistId}/${sha}`,
      }));
  },
});
