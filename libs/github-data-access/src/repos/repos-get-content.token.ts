import { InjectionToken, inject, FactoryProvider } from '@angular/core';
import { httpResource } from '@angular/common/http';
import type { paths, components } from '../schema.d';
import { GITHUB_BASE_URL } from '../api-base-url.token';

export type ReposGetContentParams =
  paths['/repos/{owner}/{repo}/contents/{path}']['get']['parameters']['query'];

export type ReposGetContentResponse =
  paths['/repos/{owner}/{repo}/contents/{path}']['get']['responses']['200']['content']['application/json'];

export type ReposGetContentError =
  | paths['/repos/{owner}/{repo}/contents/{path}']['get']['responses']['403']['content']['application/json']
  | paths['/repos/{owner}/{repo}/contents/{path}']['get']['responses']['404']['content']['application/json'];

export type ReposGetContentDiscriminatorKey =
  | 'array'
  | 'file'
  | 'symlink'
  | 'submodule';

export type ReposGetContentArray =
  components['schemas']['content-directory'] & { type: 'array' };

export type ReposGetContentFile = components['schemas']['content-file'] & {
  type: 'file';
};

export type ReposGetContentSymlink =
  components['schemas']['content-symlink'] & { type: 'symlink' };

export type ReposGetContentSubmodule =
  components['schemas']['content-submodule'] & { type: 'submodule' };

export type ReposGetContentDiscriminated =
  | ReposGetContentArray
  | ReposGetContentFile
  | ReposGetContentSymlink
  | ReposGetContentSubmodule;

export const REPOS_GET_CONTENT = new InjectionToken<
  (
    owner: string,
    repo: string,
    path: string,
    params?: ReposGetContentParams | (() => ReposGetContentParams | undefined),
  ) => ReturnType<typeof httpResource<ReposGetContentResponse>>
>('REPOS_GET_CONTENT');

export function provideReposGetContent(): FactoryProvider {
  return {
    provide: REPOS_GET_CONTENT,
    useFactory: () => {
      const base = inject(GITHUB_BASE_URL);
      return (
        owner: string,
        repo: string,
        path: string,
        params?:
          | ReposGetContentParams
          | (() => ReposGetContentParams | undefined),
      ) =>
        httpResource<ReposGetContentResponse>(() => {
          const _params = typeof params === 'function' ? params() : params;
          if (typeof params === 'function' && _params === undefined)
            return undefined;
          return {
            url: `${base}/repos/${owner}/${repo}/contents/${path}`,
            params: _params as unknown as Record<
              string,
              string | number | boolean | readonly (string | number | boolean)[]
            >,
          };
        });
    },
  };
}
