import { EnvironmentProviders } from '@angular/core';
import { provideMockEndpoint } from '@constantant/openapi-resource-mocks';
import type {
  MockEndpoint,
  MockEndpointBehavior,
  MockResourceMeta,
} from '@constantant/openapi-resource-mocks';
import { GITHUB_BASE_URL } from '../api-base-url.token';
import {
  provideReposCreateCommitSignatureProtection,
  type ReposCreateCommitSignatureProtectionResponse,
} from './repos-create-commit-signature-protection.token';

const _meta: MockResourceMeta = {
  specId: 'github',
  operationId: 'repos/create-commit-signature-protection',
  path: '/repos/{owner}/{repo}/branches/{branch}/protection/required_signatures',
  method: 'post',
  tag: 'repos',
};

export const REPOS_CREATE_COMMIT_SIGNATURE_PROTECTION_MOCK: MockEndpoint<ReposCreateCommitSignatureProtectionResponse> =
  {
    key: 'REPOS_CREATE_COMMIT_SIGNATURE_PROTECTION',
    baseUrl: GITHUB_BASE_URL,
    meta: _meta,
    provide: provideReposCreateCommitSignatureProtection,
  };

export function provideReposCreateCommitSignatureProtectionMock(
  initialBehavior?: MockEndpointBehavior<ReposCreateCommitSignatureProtectionResponse>,
): EnvironmentProviders {
  return provideMockEndpoint(
    REPOS_CREATE_COMMIT_SIGNATURE_PROTECTION_MOCK,
    initialBehavior,
  );
}
