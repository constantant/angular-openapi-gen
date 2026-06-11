import { FactoryProvider } from '@angular/core';
import { provideMockResource } from '@constantant/openapi-resource-mocks';
import type {
  ProviderInitialBehavior,
  MockResourceMeta,
} from '@constantant/openapi-resource-mocks';
import { YOUTUBE_SUBSCRIPTIONS_INSERT } from './youtube-subscriptions-insert.token';
import type { YoutubeSubscriptionsInsertResponse } from './youtube-subscriptions-insert.token';

const _meta: MockResourceMeta = {
  specId: 'youtube',
  operationId: 'youtube.subscriptions.insert',
  path: '/youtube/v3/subscriptions',
  method: 'post',
  tag: 'subscriptions',
};

export function provideYoutubeSubscriptionsInsertMock(
  initialBehavior?: ProviderInitialBehavior<YoutubeSubscriptionsInsertResponse>,
): FactoryProvider {
  return provideMockResource(
    YOUTUBE_SUBSCRIPTIONS_INSERT,
    'YOUTUBE_SUBSCRIPTIONS_INSERT',
    initialBehavior,
    _meta,
  );
}
