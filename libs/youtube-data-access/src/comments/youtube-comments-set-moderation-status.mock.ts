import { EnvironmentProviders } from '@angular/core';
import { provideMockEndpoint } from '@constantant/openapi-resource-mocks';
import type {
  MockEndpoint,
  MockEndpointBehavior,
  MockResourceMeta,
} from '@constantant/openapi-resource-mocks';
import { YOUTUBE_BASE_URL } from '../api-base-url.token';
import { provideYoutubeCommentsSetModerationStatus } from './youtube-comments-set-moderation-status.token';

const _meta: MockResourceMeta = {
  specId: 'youtube',
  operationId: 'youtube.comments.setModerationStatus',
  path: '/youtube/v3/comments/setModerationStatus',
  method: 'post',
  tag: 'comments',
};

export const YOUTUBE_COMMENTS_SET_MODERATION_STATUS_MOCK: MockEndpoint<unknown> =
  {
    key: 'YOUTUBE_COMMENTS_SET_MODERATION_STATUS',
    baseUrl: YOUTUBE_BASE_URL,
    meta: _meta,
    provide: provideYoutubeCommentsSetModerationStatus,
  };

export function provideYoutubeCommentsSetModerationStatusMock(
  initialBehavior?: MockEndpointBehavior<unknown>,
): EnvironmentProviders {
  return provideMockEndpoint(
    YOUTUBE_COMMENTS_SET_MODERATION_STATUS_MOCK,
    initialBehavior,
  );
}
