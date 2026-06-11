import { FactoryProvider } from '@angular/core';
import { provideMockResource } from '@constantant/openapi-resource-mocks';
import type {
  ProviderInitialBehavior,
  MockResourceMeta,
} from '@constantant/openapi-resource-mocks';
import { YOUTUBE_SUBSCRIPTIONS_LIST } from './youtube-subscriptions-list.token';
import type { YoutubeSubscriptionsListResponse } from './youtube-subscriptions-list.token';

const _meta: MockResourceMeta = {
  specId: 'youtube',
  operationId: 'youtube.subscriptions.list',
  path: '/youtube/v3/subscriptions',
  method: 'get',
  tag: 'subscriptions',
};

export function provideYoutubeSubscriptionsListMock(
  initialBehavior?: ProviderInitialBehavior<YoutubeSubscriptionsListResponse>,
): FactoryProvider {
  return provideMockResource(
    YOUTUBE_SUBSCRIPTIONS_LIST,
    'YOUTUBE_SUBSCRIPTIONS_LIST',
    initialBehavior,
    _meta,
  );
}
