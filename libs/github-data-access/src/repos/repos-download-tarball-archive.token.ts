import { InjectionToken, inject, FactoryProvider } from '@angular/core';
import { httpResource } from '@angular/common/http';
import type { paths } from '../schema.d';
import { GITHUB_BASE_URL } from '../api-base-url.token';

export const REPOS_DOWNLOAD_TARBALL_ARCHIVE = new InjectionToken<
  (
    owner: string,
    repo: string,
    ref: string,
  ) => ReturnType<typeof httpResource<unknown>>
>('REPOS_DOWNLOAD_TARBALL_ARCHIVE');

export function provideReposDownloadTarballArchive(): FactoryProvider {
  return {
    provide: REPOS_DOWNLOAD_TARBALL_ARCHIVE,
    useFactory: () => {
      const base = inject(GITHUB_BASE_URL);
      return (owner: string, repo: string, ref: string) =>
        httpResource<unknown>(() => ({
          url: `${base}/repos/${owner}/${repo}/tarball/${ref}`,
        }));
    },
  };
}
