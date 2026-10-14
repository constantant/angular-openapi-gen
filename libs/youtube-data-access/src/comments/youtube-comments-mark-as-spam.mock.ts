import { EnvironmentProviders } from '@angular/core';
import { provideMockEndpoint } from '@constantant/openapi-resource-mocks';
import type {
  MockEndpoint,
  MockEndpointBehavior,
  MockResourceMeta,
} from '@constantant/openapi-resource-mocks';
import { YOUTUBE_BASE_URL } from '../api-base-url.token';
import { provideYoutubeCommentsMarkAsSpam } from './youtube-comments-mark-as-spam.token';

const _meta: MockResourceMeta = {
  specId: 'youtube',
  operationId: 'youtube.comments.markAsSpam',
  path: '/youtube/v3/comments/markAsSpam',
  method: 'post',
  tag: 'comments',
};

export const YOUTUBE_COMMENTS_MARK_AS_SPAM_MOCK: MockEndpoint<unknown> = {
  key: 'YOUTUBE_COMMENTS_MARK_AS_SPAM',
  baseUrl: YOUTUBE_BASE_URL,
  meta: _meta,
  provide: provideYoutubeCommentsMarkAsSpam,
};

export function provideYoutubeCommentsMarkAsSpamMock(
  initialBehavior?: MockEndpointBehavior<unknown>,
): EnvironmentProviders {
  return provideMockEndpoint(
    YOUTUBE_COMMENTS_MARK_AS_SPAM_MOCK,
    initialBehavior,
  );
}
