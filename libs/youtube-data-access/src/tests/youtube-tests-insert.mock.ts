import { FactoryProvider } from '@angular/core';
import { provideMockResource } from '@constantant/openapi-resource-mocks';
import type {
  ProviderInitialBehavior,
  MockResourceMeta,
} from '@constantant/openapi-resource-mocks';
import { YOUTUBE_TESTS_INSERT } from './youtube-tests-insert.token';
import type { YoutubeTestsInsertResponse } from './youtube-tests-insert.token';

const _meta: MockResourceMeta = {
  specId: 'youtube',
  operationId: 'youtube.tests.insert',
  path: '/youtube/v3/tests',
  method: 'post',
  tag: 'tests',
};

export function provideYoutubeTestsInsertMock(
  initialBehavior?: ProviderInitialBehavior<YoutubeTestsInsertResponse>,
): FactoryProvider {
  return provideMockResource(
    YOUTUBE_TESTS_INSERT,
    'YOUTUBE_TESTS_INSERT',
    initialBehavior,
    _meta,
  );
}
