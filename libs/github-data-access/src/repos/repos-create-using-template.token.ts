import { InjectionToken, inject, Signal } from '@angular/core';
import { httpResource } from '@angular/common/http';
import type { paths } from '../schema.d';
import { GITHUB_BASE_URL } from '../api-base-url.token';

type ReposCreateUsingTemplateBody = NonNullable<
  paths['/repos/{template_owner}/{template_repo}/generate']['post']['requestBody']
>['content']['application/json'];

type ReposCreateUsingTemplateResponse =
  paths['/repos/{template_owner}/{template_repo}/generate']['post']['responses']['201']['content']['application/json'];

export const REPOS_CREATE_USING_TEMPLATE = new InjectionToken<
  (
    template_owner: string,
    template_repo: string,
    body: ReposCreateUsingTemplateBody | Signal<ReposCreateUsingTemplateBody>,
  ) => ReturnType<typeof httpResource<ReposCreateUsingTemplateResponse>>
>('REPOS_CREATE_USING_TEMPLATE', {
  providedIn: 'root',
  factory: () => {
    const base = inject(GITHUB_BASE_URL);
    return (
      template_owner: string,
      template_repo: string,
      body: ReposCreateUsingTemplateBody | Signal<ReposCreateUsingTemplateBody>,
    ) =>
      httpResource<ReposCreateUsingTemplateResponse>(() => ({
        url: `${base}/repos/${template_owner}/${template_repo}/generate`,
        method: 'POST',
        body,
      }));
  },
});
