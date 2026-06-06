import { InjectionToken, inject, Signal, FactoryProvider } from '@angular/core';
import { httpResource } from '@angular/common/http';
import type { paths } from '../schema.d';
import { GITHUB_BASE_URL } from '../api-base-url.token';

export type ReposCreateUsingTemplateBody = NonNullable<
  paths['/repos/{template_owner}/{template_repo}/generate']['post']['requestBody']
>['content']['application/json'];

export type ReposCreateUsingTemplateResponse =
  paths['/repos/{template_owner}/{template_repo}/generate']['post']['responses']['201']['content']['application/json'];

export const REPOS_CREATE_USING_TEMPLATE = new InjectionToken<
  (
    templateOwner: string,
    templateRepo: string,
    body: ReposCreateUsingTemplateBody | Signal<ReposCreateUsingTemplateBody>,
  ) => ReturnType<typeof httpResource<ReposCreateUsingTemplateResponse>>
>('REPOS_CREATE_USING_TEMPLATE');

export function provideReposCreateUsingTemplate(): FactoryProvider {
  return {
    provide: REPOS_CREATE_USING_TEMPLATE,
    useFactory: () => {
      const base = inject(GITHUB_BASE_URL);
      return (
        templateOwner: string,
        templateRepo: string,
        body:
          | ReposCreateUsingTemplateBody
          | Signal<ReposCreateUsingTemplateBody>,
      ) =>
        httpResource<ReposCreateUsingTemplateResponse>(() => ({
          url: `${base}/repos/${templateOwner}/${templateRepo}/generate`,
          method: 'POST',
          body,
        }));
    },
  };
}
