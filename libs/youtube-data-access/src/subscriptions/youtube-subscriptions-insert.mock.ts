import { FactoryProvider } from '@angular/core';
import { provideMockResource } from '@constantant/openapi-resource-mocks';
import type { ProviderInitialBehavior } from '@constantant/openapi-resource-mocks';
import { YOUTUBE_SUBSCRIPTIONS_INSERT } from './youtube-subscriptions-insert.token';
import type { YoutubeSubscriptionsInsertResponse } from './youtube-subscriptions-insert.token';

export function provideYoutubeSubscriptionsInsertMock(
  initialBehavior?: ProviderInitialBehavior<YoutubeSubscriptionsInsertResponse>,
): FactoryProvider {
  return provideMockResource(
    YOUTUBE_SUBSCRIPTIONS_INSERT,
    'YOUTUBE_SUBSCRIPTIONS_INSERT',
    initialBehavior,
  );
}
