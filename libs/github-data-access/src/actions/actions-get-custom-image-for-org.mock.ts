import { FactoryProvider } from '@angular/core';
import { provideMockResource } from '@constantant/openapi-resource-mocks';
import type {
  ProviderInitialBehavior,
  MockResourceMeta,
} from '@constantant/openapi-resource-mocks';
import { ACTIONS_GET_CUSTOM_IMAGE_FOR_ORG } from './actions-get-custom-image-for-org.token';
import type { ActionsGetCustomImageForOrgResponse } from './actions-get-custom-image-for-org.token';

const _meta: MockResourceMeta = {
  specId: 'github',
  operationId: 'actions/get-custom-image-for-org',
  path: '/orgs/{org}/actions/hosted-runners/images/custom/{image_definition_id}',
  method: 'get',
  tag: 'actions',
};

export function provideActionsGetCustomImageForOrgMock(
  initialBehavior?: ProviderInitialBehavior<ActionsGetCustomImageForOrgResponse>,
): FactoryProvider {
  return provideMockResource(
    ACTIONS_GET_CUSTOM_IMAGE_FOR_ORG,
    'ACTIONS_GET_CUSTOM_IMAGE_FOR_ORG',
    initialBehavior,
    _meta,
  );
}
