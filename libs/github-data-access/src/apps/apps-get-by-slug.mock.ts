import { FactoryProvider } from '@angular/core';
import { provideMockResource } from '@constantant/openapi-resource-mocks';
import type {
  ProviderInitialBehavior,
  MockResourceMeta,
} from '@constantant/openapi-resource-mocks';
import { APPS_GET_BY_SLUG } from './apps-get-by-slug.token';
import type { AppsGetBySlugResponse } from './apps-get-by-slug.token';

const _meta: MockResourceMeta = {
  specId: 'github',
  operationId: 'apps/get-by-slug',
  path: '/apps/{app_slug}',
  method: 'get',
  tag: 'apps',
};

export function provideAppsGetBySlugMock(
  initialBehavior?: ProviderInitialBehavior<AppsGetBySlugResponse>,
): FactoryProvider {
  return provideMockResource(
    APPS_GET_BY_SLUG,
    'APPS_GET_BY_SLUG',
    initialBehavior,
    _meta,
  );
}
