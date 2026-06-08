import { FactoryProvider } from '@angular/core';
import { provideMockResource } from '@constantant/openapi-resource-mocks';
import type { ProviderInitialBehavior } from '@constantant/openapi-resource-mocks';
import { MARKDOWN_RENDER_RAW } from './markdown-render-raw.token';

export function provideMarkdownRenderRawMock(
  initialBehavior?: ProviderInitialBehavior<unknown>,
): FactoryProvider {
  return provideMockResource(
    MARKDOWN_RENDER_RAW,
    'MARKDOWN_RENDER_RAW',
    initialBehavior,
  );
}
