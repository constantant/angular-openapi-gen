import { FactoryProvider } from '@angular/core';
import { provideMockResource } from '@constantant/openapi-resource-mocks';
import type {
  ProviderInitialBehavior,
  MockResourceMeta,
} from '@constantant/openapi-resource-mocks';
import { ACTIONS_DELETE_CUSTOM_IMAGE_FROM_ORG } from './actions-delete-custom-image-from-org.token';

const _meta: MockResourceMeta = {
  specId: 'github',
  operationId: 'actions/delete-custom-image-from-org',
  path: '/orgs/{org}/actions/hosted-runners/images/custom/{image_definition_id}',
  method: 'delete',
  tag: 'actions',
};

export function provideActionsDeleteCustomImageFromOrgMock(
  initialBehavior?: ProviderInitialBehavior<unknown>,
): FactoryProvider {
  return provideMockResource(
    ACTIONS_DELETE_CUSTOM_IMAGE_FROM_ORG,
    'ACTIONS_DELETE_CUSTOM_IMAGE_FROM_ORG',
    initialBehavior,
    _meta,
  );
}
