import { InjectionToken, inject, FactoryProvider } from '@angular/core';
import { httpResource } from '@angular/common/http';
import type { paths } from '../schema.d';
import { GITHUB_BASE_URL } from '../api-base-url.token';

export type GitignoreGetAllTemplatesResponse =
  paths['/gitignore/templates']['get']['responses']['200']['content']['application/json'];

export const GITIGNORE_GET_ALL_TEMPLATES = new InjectionToken<
  () => ReturnType<typeof httpResource<GitignoreGetAllTemplatesResponse>>
>('GITIGNORE_GET_ALL_TEMPLATES');

export function provideGitignoreGetAllTemplates(): FactoryProvider {
  return {
    provide: GITIGNORE_GET_ALL_TEMPLATES,
    useFactory: () => {
      const base = inject(GITHUB_BASE_URL);
      return () =>
        httpResource<GitignoreGetAllTemplatesResponse>(() => ({
          url: `${base}/gitignore/templates`,
        }));
    },
  };
}
