import { InjectionToken, inject, FactoryProvider } from '@angular/core';
import { httpResource } from '@angular/common/http';
import type { paths } from '../schema.d';
import { GITHUB_BASE_URL } from '../api-base-url.token';

export type GitignoreGetTemplateResponse =
  paths['/gitignore/templates/{name}']['get']['responses']['200']['content']['application/json'];

export const GITIGNORE_GET_TEMPLATE = new InjectionToken<
  (
    name: string,
  ) => ReturnType<typeof httpResource<GitignoreGetTemplateResponse>>
>('GITIGNORE_GET_TEMPLATE');

export function provideGitignoreGetTemplate(): FactoryProvider {
  return {
    provide: GITIGNORE_GET_TEMPLATE,
    useFactory: () => {
      const base = inject(GITHUB_BASE_URL);
      return (name: string) =>
        httpResource<GitignoreGetTemplateResponse>(() => ({
          url: `${base}/gitignore/templates/${name}`,
        }));
    },
  };
}
