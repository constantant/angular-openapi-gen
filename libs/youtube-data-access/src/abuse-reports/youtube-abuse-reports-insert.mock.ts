import { FactoryProvider } from '@angular/core';
import { provideMockResource } from '@constantant/openapi-resource-mocks';
import type {
  ProviderInitialBehavior,
  MockResourceMeta,
} from '@constantant/openapi-resource-mocks';
import { YOUTUBE_ABUSE_REPORTS_INSERT } from './youtube-abuse-reports-insert.token';
import type { YoutubeAbuseReportsInsertResponse } from './youtube-abuse-reports-insert.token';

const _meta: MockResourceMeta = {
  specId: 'youtube',
  operationId: 'youtube.abuseReports.insert',
  path: '/youtube/v3/abuseReports',
  method: 'post',
  tag: 'abuse-reports',
};

export function provideYoutubeAbuseReportsInsertMock(
  initialBehavior?: ProviderInitialBehavior<YoutubeAbuseReportsInsertResponse>,
): FactoryProvider {
  return provideMockResource(
    YOUTUBE_ABUSE_REPORTS_INSERT,
    'YOUTUBE_ABUSE_REPORTS_INSERT',
    initialBehavior,
    _meta,
  );
}
