import { FactoryProvider } from '@angular/core';
import { provideMockResource } from '@constantant/openapi-resource-mocks';
import type {
  ProviderInitialBehavior,
  MockResourceMeta,
} from '@constantant/openapi-resource-mocks';
import { ACTIONS_LIST_CUSTOM_IMAGES_FOR_ORG } from './actions-list-custom-images-for-org.token';
import type { ActionsListCustomImagesForOrgResponse } from './actions-list-custom-images-for-org.token';

const _meta: MockResourceMeta = {
  specId: 'github',
  operationId: 'actions/list-custom-images-for-org',
  path: '/orgs/{org}/actions/hosted-runners/images/custom',
  method: 'get',
  tag: 'actions',
};

export function provideActionsListCustomImagesForOrgMock(
  initialBehavior?: ProviderInitialBehavior<ActionsListCustomImagesForOrgResponse>,
): FactoryProvider {
  return provideMockResource(
    ACTIONS_LIST_CUSTOM_IMAGES_FOR_ORG,
    'ACTIONS_LIST_CUSTOM_IMAGES_FOR_ORG',
    initialBehavior,
    _meta,
  );
}
