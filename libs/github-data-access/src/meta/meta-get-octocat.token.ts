import { InjectionToken, inject, FactoryProvider } from '@angular/core';
import { httpResource } from '@angular/common/http';
import type { paths } from '../schema.d';
import { GITHUB_BASE_URL } from '../api-base-url.token';

export type MetaGetOctocatParams =
  paths['/octocat']['get']['parameters']['query'];

export const META_GET_OCTOCAT = new InjectionToken<
  (
    params?: MetaGetOctocatParams | (() => MetaGetOctocatParams | undefined),
  ) => ReturnType<typeof httpResource<unknown>>
>('META_GET_OCTOCAT');

export function provideMetaGetOctocat(): FactoryProvider {
  return {
    provide: META_GET_OCTOCAT,
    useFactory: () => {
      const base = inject(GITHUB_BASE_URL);
      return (
        params?:
          | MetaGetOctocatParams
          | (() => MetaGetOctocatParams | undefined),
      ) =>
        httpResource<unknown>(() => ({
          url: `${base}/octocat`,
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
