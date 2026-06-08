import { FactoryProvider } from '@angular/core';
import { provideMockResource } from '@constantant/openapi-resource-mocks';
import type { ProviderInitialBehavior } from '@constantant/openapi-resource-mocks';
import { YOUTUBE_TESTS_INSERT } from './youtube-tests-insert.token';
import type { YoutubeTestsInsertResponse } from './youtube-tests-insert.token';

export function provideYoutubeTestsInsertMock(
  initialBehavior?: ProviderInitialBehavior<YoutubeTestsInsertResponse>,
): FactoryProvider {
  return provideMockResource(
    YOUTUBE_TESTS_INSERT,
    'YOUTUBE_TESTS_INSERT',
    initialBehavior,
  );
}
