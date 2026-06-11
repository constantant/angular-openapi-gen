import { FactoryProvider } from '@angular/core';
import { provideMockResource } from '@constantant/openapi-resource-mocks';
import type {
  ProviderInitialBehavior,
  MockResourceMeta,
} from '@constantant/openapi-resource-mocks';
import { REPOS_CANCEL_PAGES_DEPLOYMENT } from './repos-cancel-pages-deployment.token';

const _meta: MockResourceMeta = {
  specId: 'github',
  operationId: 'repos/cancel-pages-deployment',
  path: '/repos/{owner}/{repo}/pages/deployments/{pages_deployment_id}/cancel',
  method: 'post',
  tag: 'repos',
};

export function provideReposCancelPagesDeploymentMock(
  initialBehavior?: ProviderInitialBehavior<unknown>,
): FactoryProvider {
  return provideMockResource(
    REPOS_CANCEL_PAGES_DEPLOYMENT,
    'REPOS_CANCEL_PAGES_DEPLOYMENT',
    initialBehavior,
    _meta,
  );
}
