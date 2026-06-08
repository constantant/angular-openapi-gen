import { FactoryProvider } from '@angular/core';
import { provideMockResource } from '@constantant/openapi-resource-mocks';
import type { ProviderInitialBehavior } from '@constantant/openapi-resource-mocks';
import { YOUTUBE_VIDEOS_REPORT_ABUSE } from './youtube-videos-report-abuse.token';

export function provideYoutubeVideosReportAbuseMock(
  initialBehavior?: ProviderInitialBehavior<unknown>,
): FactoryProvider {
  return provideMockResource(
    YOUTUBE_VIDEOS_REPORT_ABUSE,
    'YOUTUBE_VIDEOS_REPORT_ABUSE',
    initialBehavior,
  );
}
