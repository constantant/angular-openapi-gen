import { EnvironmentProviders } from '@angular/core';
import { provideMockEndpoint } from '@constantant/openapi-resource-mocks';
import type {
  MockEndpoint,
  MockEndpointBehavior,
  MockResourceMeta,
} from '@constantant/openapi-resource-mocks';
import { YOUTUBE_BASE_URL } from '../api-base-url.token';
import {
  provideYoutubeMembersList,
  type YoutubeMembersListResponse,
} from './youtube-members-list.token';

const _meta: MockResourceMeta = {
  specId: 'youtube',
  operationId: 'youtube.members.list',
  path: '/youtube/v3/members',
  method: 'get',
  tag: 'members',
};

export const YOUTUBE_MEMBERS_LIST_MOCK: MockEndpoint<YoutubeMembersListResponse> =
  {
    key: 'YOUTUBE_MEMBERS_LIST',
    baseUrl: YOUTUBE_BASE_URL,
    meta: _meta,
    provide: provideYoutubeMembersList,
  };

export function provideYoutubeMembersListMock(
  initialBehavior?: MockEndpointBehavior<YoutubeMembersListResponse>,
): EnvironmentProviders {
  return provideMockEndpoint(YOUTUBE_MEMBERS_LIST_MOCK, initialBehavior);
}
