import { FactoryProvider } from '@angular/core';
import { provideMockResource } from '@constantant/openapi-resource-mocks';
import type {
  ProviderInitialBehavior,
  MockResourceMeta,
} from '@constantant/openapi-resource-mocks';
import { YOUTUBE_VIDEO_ABUSE_REPORT_REASONS_LIST } from './youtube-video-abuse-report-reasons-list.token';
import type { YoutubeVideoAbuseReportReasonsListResponse } from './youtube-video-abuse-report-reasons-list.token';

const _meta: MockResourceMeta = {
  specId: 'youtube',
  operationId: 'youtube.videoAbuseReportReasons.list',
  path: '/youtube/v3/videoAbuseReportReasons',
  method: 'get',
  tag: 'video-abuse-report-reasons',
};

export function provideYoutubeVideoAbuseReportReasonsListMock(
  initialBehavior?: ProviderInitialBehavior<YoutubeVideoAbuseReportReasonsListResponse>,
): FactoryProvider {
  return provideMockResource(
    YOUTUBE_VIDEO_ABUSE_REPORT_REASONS_LIST,
    'YOUTUBE_VIDEO_ABUSE_REPORT_REASONS_LIST',
    initialBehavior,
    _meta,
  );
}
