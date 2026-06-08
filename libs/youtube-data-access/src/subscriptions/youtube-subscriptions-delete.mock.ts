import { FactoryProvider } from '@angular/core';
import { provideMockResource } from '@constantant/openapi-resource-mocks';
import type { ProviderInitialBehavior } from '@constantant/openapi-resource-mocks';
import { YOUTUBE_SUBSCRIPTIONS_DELETE } from './youtube-subscriptions-delete.token';

export function provideYoutubeSubscriptionsDeleteMock(
  initialBehavior?: ProviderInitialBehavior<unknown>,
): FactoryProvider {
  return provideMockResource(
    YOUTUBE_SUBSCRIPTIONS_DELETE,
    'YOUTUBE_SUBSCRIPTIONS_DELETE',
    initialBehavior,
  );
}
