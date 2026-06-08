import { FactoryProvider } from '@angular/core';
import { provideMockResource } from '@constantant/openapi-resource-mocks';
import type { ProviderInitialBehavior } from '@constantant/openapi-resource-mocks';
import { YOUTUBE_SUBSCRIPTIONS_LIST } from './youtube-subscriptions-list.token';
import type { YoutubeSubscriptionsListResponse } from './youtube-subscriptions-list.token';

export function provideYoutubeSubscriptionsListMock(
  initialBehavior?: ProviderInitialBehavior<YoutubeSubscriptionsListResponse>,
): FactoryProvider {
  return provideMockResource(
    YOUTUBE_SUBSCRIPTIONS_LIST,
    'YOUTUBE_SUBSCRIPTIONS_LIST',
    initialBehavior,
  );
}
