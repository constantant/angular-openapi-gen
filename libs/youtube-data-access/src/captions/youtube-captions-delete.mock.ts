import { EnvironmentProviders } from '@angular/core';
import { provideMockEndpoint } from '@constantant/openapi-resource-mocks';
import type {
  MockEndpoint,
  MockEndpointBehavior,
  MockResourceMeta,
} from '@constantant/openapi-resource-mocks';
import { YOUTUBE_BASE_URL } from '../api-base-url.token';
import { provideYoutubeCaptionsDelete } from './youtube-captions-delete.token';

const _meta: MockResourceMeta = {
  specId: 'youtube',
  operationId: 'youtube.captions.delete',
  path: '/youtube/v3/captions',
  method: 'delete',
  tag: 'captions',
};

export const YOUTUBE_CAPTIONS_DELETE_MOCK: MockEndpoint<unknown> = {
  key: 'YOUTUBE_CAPTIONS_DELETE',
  baseUrl: YOUTUBE_BASE_URL,
  meta: _meta,
  provide: provideYoutubeCaptionsDelete,
};

export function provideYoutubeCaptionsDeleteMock(
  initialBehavior?: MockEndpointBehavior<unknown>,
): EnvironmentProviders {
  return provideMockEndpoint(YOUTUBE_CAPTIONS_DELETE_MOCK, initialBehavior);
}
