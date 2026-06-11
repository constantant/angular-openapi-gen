import { FactoryProvider } from '@angular/core';
import { provideMockResource } from '@constantant/openapi-resource-mocks';
import type {
  ProviderInitialBehavior,
  MockResourceMeta,
} from '@constantant/openapi-resource-mocks';
import { ACTIONS_GET_CUSTOM_IMAGE_VERSION_FOR_ORG } from './actions-get-custom-image-version-for-org.token';
import type { ActionsGetCustomImageVersionForOrgResponse } from './actions-get-custom-image-version-for-org.token';

const _meta: MockResourceMeta = {
  specId: 'github',
  operationId: 'actions/get-custom-image-version-for-org',
  path: '/orgs/{org}/actions/hosted-runners/images/custom/{image_definition_id}/versions/{version}',
  method: 'get',
  tag: 'actions',
};

export function provideActionsGetCustomImageVersionForOrgMock(
  initialBehavior?: ProviderInitialBehavior<ActionsGetCustomImageVersionForOrgResponse>,
): FactoryProvider {
  return provideMockResource(
    ACTIONS_GET_CUSTOM_IMAGE_VERSION_FOR_ORG,
    'ACTIONS_GET_CUSTOM_IMAGE_VERSION_FOR_ORG',
    initialBehavior,
    _meta,
  );
}
