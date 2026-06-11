import { FactoryProvider } from '@angular/core';
import { provideMockResource } from '@constantant/openapi-resource-mocks';
import type {
  ProviderInitialBehavior,
  MockResourceMeta,
} from '@constantant/openapi-resource-mocks';
import { YOUTUBE_CAPTIONS_DELETE } from './youtube-captions-delete.token';

const _meta: MockResourceMeta = {
  specId: 'youtube',
  operationId: 'youtube.captions.delete',
  path: '/youtube/v3/captions',
  method: 'delete',
  tag: 'captions',
};

export function provideYoutubeCaptionsDeleteMock(
  initialBehavior?: ProviderInitialBehavior<unknown>,
): FactoryProvider {
  return provideMockResource(
    YOUTUBE_CAPTIONS_DELETE,
    'YOUTUBE_CAPTIONS_DELETE',
    initialBehavior,
    _meta,
  );
}
