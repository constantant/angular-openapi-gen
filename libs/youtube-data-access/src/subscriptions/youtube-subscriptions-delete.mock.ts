import { FactoryProvider } from '@angular/core';
import { provideMockObservable } from '@constantant/openapi-resource-mocks';
import type {
  ProviderInitialBehavior,
  MockProviderOptions,
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
  options?: MockProviderOptions,
): FactoryProvider {
  return provideMockObservable(
    YOUTUBE_SUBSCRIPTIONS_DELETE,
    'YOUTUBE_SUBSCRIPTIONS_DELETE',
    initialBehavior,
    _meta,
    options,
  );
}
