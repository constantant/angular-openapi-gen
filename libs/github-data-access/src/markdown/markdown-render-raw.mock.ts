import { FactoryProvider } from '@angular/core';
import { provideMockResource } from '@constantant/openapi-resource-mocks';
import type {
  ProviderInitialBehavior,
  MockResourceMeta,
} from '@constantant/openapi-resource-mocks';
import { MARKDOWN_RENDER_RAW } from './markdown-render-raw.token';

const _meta: MockResourceMeta = {
  specId: 'github',
  operationId: 'markdown/render-raw',
  path: '/markdown/raw',
  method: 'post',
  tag: 'markdown',
};

export function provideMarkdownRenderRawMock(
  initialBehavior?: ProviderInitialBehavior<unknown>,
): FactoryProvider {
  return provideMockResource(
    MARKDOWN_RENDER_RAW,
    'MARKDOWN_RENDER_RAW',
    initialBehavior,
    _meta,
  );
}
