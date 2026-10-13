import { EnvironmentProviders } from '@angular/core';
import { provideMockEndpoint } from '@constantant/openapi-resource-mocks';
import type {
  MockEndpoint,
  MockEndpointBehavior,
  MockResourceMeta,
} from '@constantant/openapi-resource-mocks';
import { GITHUB_BASE_URL } from '../api-base-url.token';
import { provideReposDeleteBranchProtection } from './repos-delete-branch-protection.token';

const _meta: MockResourceMeta = {
  specId: 'github',
  operationId: 'repos/delete-branch-protection',
  path: '/repos/{owner}/{repo}/branches/{branch}/protection',
  method: 'delete',
  tag: 'repos',
};

export const REPOS_DELETE_BRANCH_PROTECTION_MOCK: MockEndpoint<unknown> = {
  key: 'REPOS_DELETE_BRANCH_PROTECTION',
  baseUrl: GITHUB_BASE_URL,
  meta: _meta,
  provide: provideReposDeleteBranchProtection,
};

export function provideReposDeleteBranchProtectionMock(
  initialBehavior?: MockEndpointBehavior<unknown>,
): EnvironmentProviders {
  return provideMockEndpoint(
    REPOS_DELETE_BRANCH_PROTECTION_MOCK,
    initialBehavior,
  );
}
