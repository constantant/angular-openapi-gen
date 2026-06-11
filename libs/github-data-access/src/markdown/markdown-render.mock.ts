import { FactoryProvider } from '@angular/core';
import { provideMockResource } from '@constantant/openapi-resource-mocks';
import type {
  ProviderInitialBehavior,
  MockResourceMeta,
} from '@constantant/openapi-resource-mocks';
import { MARKDOWN_RENDER } from './markdown-render.token';

const _meta: MockResourceMeta = {
  specId: 'github',
  operationId: 'markdown/render',
  path: '/markdown',
  method: 'post',
  tag: 'markdown',
};

export function provideMarkdownRenderMock(
  initialBehavior?: ProviderInitialBehavior<unknown>,
): FactoryProvider {
  return provideMockResource(
    MARKDOWN_RENDER,
    'MARKDOWN_RENDER',
    initialBehavior,
    _meta,
  );
}
