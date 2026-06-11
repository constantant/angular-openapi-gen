import { FactoryProvider } from '@angular/core';
import { provideMockResource } from '@constantant/openapi-resource-mocks';
import type {
  ProviderInitialBehavior,
  MockResourceMeta,
} from '@constantant/openapi-resource-mocks';
import { REPOS_CODEOWNERS_ERRORS } from './repos-codeowners-errors.token';
import type { ReposCodeownersErrorsResponse } from './repos-codeowners-errors.token';

const _meta: MockResourceMeta = {
  specId: 'github',
  operationId: 'repos/codeowners-errors',
  path: '/repos/{owner}/{repo}/codeowners/errors',
  method: 'get',
  tag: 'repos',
};

export function provideReposCodeownersErrorsMock(
  initialBehavior?: ProviderInitialBehavior<ReposCodeownersErrorsResponse>,
): FactoryProvider {
  return provideMockResource(
    REPOS_CODEOWNERS_ERRORS,
    'REPOS_CODEOWNERS_ERRORS',
    initialBehavior,
    _meta,
  );
}
