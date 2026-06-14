import { InjectionToken, inject, FactoryProvider } from '@angular/core';
import { httpResource } from '@angular/common/http';
import type { paths } from '../schema.d';
import { GITHUB_BASE_URL } from '../api-base-url.token';

export type GitGetBlobResponse =
  paths['/repos/{owner}/{repo}/git/blobs/{file_sha}']['get']['responses']['200']['content']['application/json'];

export const GIT_GET_BLOB = new InjectionToken<
  (
    owner: string,
    repo: string,
    fileSha: string,
  ) => ReturnType<typeof httpResource<GitGetBlobResponse>>
>('GIT_GET_BLOB');

export function provideGitGetBlob(): FactoryProvider {
  return {
    provide: GIT_GET_BLOB,
    useFactory: () => {
      const base = inject(GITHUB_BASE_URL);
      return (owner: string, repo: string, fileSha: string) =>
        httpResource<GitGetBlobResponse>(() => ({
          url: `${base}/repos/${owner}/${repo}/git/blobs/${fileSha}`,
        }));
    },
  };
}
