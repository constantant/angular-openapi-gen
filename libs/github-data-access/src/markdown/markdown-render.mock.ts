import { FactoryProvider } from '@angular/core';
import { provideMockResource } from '@constantant/openapi-resource-mocks';
import type { ProviderInitialBehavior } from '@constantant/openapi-resource-mocks';
import { MARKDOWN_RENDER } from './markdown-render.token';

export function provideMarkdownRenderMock(
  initialBehavior?: ProviderInitialBehavior<unknown>,
): FactoryProvider {
  return provideMockResource(
    MARKDOWN_RENDER,
    'MARKDOWN_RENDER',
    initialBehavior,
  );
}
