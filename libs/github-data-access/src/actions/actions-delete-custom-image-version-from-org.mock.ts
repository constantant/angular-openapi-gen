import { FactoryProvider } from '@angular/core';
import { provideMockResource } from '@constantant/openapi-resource-mocks';
import type {
  ProviderInitialBehavior,
  MockResourceMeta,
} from '@constantant/openapi-resource-mocks';
import { ACTIONS_DELETE_CUSTOM_IMAGE_VERSION_FROM_ORG } from './actions-delete-custom-image-version-from-org.token';

const _meta: MockResourceMeta = {
  specId: 'github',
  operationId: 'actions/delete-custom-image-version-from-org',
  path: '/orgs/{org}/actions/hosted-runners/images/custom/{image_definition_id}/versions/{version}',
  method: 'delete',
  tag: 'actions',
};

export function provideActionsDeleteCustomImageVersionFromOrgMock(
  initialBehavior?: ProviderInitialBehavior<unknown>,
): FactoryProvider {
  return provideMockResource(
    ACTIONS_DELETE_CUSTOM_IMAGE_VERSION_FROM_ORG,
    'ACTIONS_DELETE_CUSTOM_IMAGE_VERSION_FROM_ORG',
    initialBehavior,
    _meta,
  );
}
