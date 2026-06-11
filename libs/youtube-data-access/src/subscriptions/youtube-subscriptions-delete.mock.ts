import { FactoryProvider } from '@angular/core';
import { provideMockResource } from '@constantant/openapi-resource-mocks';
import type {
  ProviderInitialBehavior,
  MockResourceMeta,
} from '@constantant/openapi-resource-mocks';
import { YOUTUBE_SUBSCRIPTIONS_DELETE } from './youtube-subscriptions-delete.token';

const _meta: MockResourceMeta = {
  specId: 'youtube',
  operationId: 'youtube.subscriptions.delete',
  path: '/youtube/v3/subscriptions',
  method: 'delete',
  tag: 'subscriptions',
};

export function provideYoutubeSubscriptionsDeleteMock(
  initialBehavior?: ProviderInitialBehavior<unknown>,
): FactoryProvider {
  return provideMockResource(
    YOUTUBE_SUBSCRIPTIONS_DELETE,
    'YOUTUBE_SUBSCRIPTIONS_DELETE',
    initialBehavior,
    _meta,
  );
}
