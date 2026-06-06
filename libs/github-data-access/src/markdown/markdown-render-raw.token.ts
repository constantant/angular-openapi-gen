import { InjectionToken, inject, Signal } from '@angular/core';
import { httpResource } from '@angular/common/http';
import type { paths } from '../schema.d';
import { GITHUB_BASE_URL } from '../api-base-url.token';

export type MarkdownRenderRawBody = NonNullable<
  paths['/markdown/raw']['post']['requestBody']
>['content']['text/plain'];

export const MARKDOWN_RENDER_RAW = new InjectionToken<
  (
    body: MarkdownRenderRawBody | Signal<MarkdownRenderRawBody>,
  ) => ReturnType<typeof httpResource<unknown>>
>('MARKDOWN_RENDER_RAW', {
  providedIn: 'root',
  factory: () => {
    const base = inject(GITHUB_BASE_URL);
    return (body: MarkdownRenderRawBody | Signal<MarkdownRenderRawBody>) =>
      httpResource<unknown>(() => ({
        url: `${base}/markdown/raw`,
        method: 'POST',
        body,
      }));
  },
});
