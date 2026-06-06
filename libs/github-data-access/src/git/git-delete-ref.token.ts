import { InjectionToken, inject, FactoryProvider } from '@angular/core';
import { httpResource } from '@angular/common/http';
import type { paths } from '../schema.d';
import { GITHUB_BASE_URL } from '../api-base-url.token';

export const GIT_DELETE_REF = new InjectionToken<
  (
    owner: string,
    repo: string,
    ref: string,
  ) => ReturnType<typeof httpResource<unknown>>
>('GIT_DELETE_REF');

export function provideGitDeleteRef(): FactoryProvider {
  return {
    provide: GIT_DELETE_REF,
    useFactory: () => {
      const base = inject(GITHUB_BASE_URL);
      return (owner: string, repo: string, ref: string) =>
        httpResource<unknown>(() => ({
          url: `${base}/repos/${owner}/${repo}/git/refs/${ref}`,
          method: 'DELETE',
        }));
    },
  };
}
