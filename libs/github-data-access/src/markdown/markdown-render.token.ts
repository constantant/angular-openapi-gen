import { InjectionToken, inject, Signal, FactoryProvider } from '@angular/core';
import { httpResource } from '@angular/common/http';
import type { paths } from '../schema.d';
import { GITHUB_BASE_URL } from '../api-base-url.token';

export type MarkdownRenderBody = NonNullable<
  paths['/markdown']['post']['requestBody']
>['content']['application/json'];

export const MARKDOWN_RENDER = new InjectionToken<
  (
    body: MarkdownRenderBody | Signal<MarkdownRenderBody>,
  ) => ReturnType<typeof httpResource<unknown>>
>('MARKDOWN_RENDER');

export function provideMarkdownRender(): FactoryProvider {
  return {
    provide: MARKDOWN_RENDER,
    useFactory: () => {
      const base = inject(GITHUB_BASE_URL);
      return (body: MarkdownRenderBody | Signal<MarkdownRenderBody>) =>
        httpResource<unknown>(() => ({
          url: `${base}/markdown`,
          method: 'POST',
          body,
        }));
    },
  };
}
