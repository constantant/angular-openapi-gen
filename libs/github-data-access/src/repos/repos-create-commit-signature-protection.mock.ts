import { FactoryProvider } from '@angular/core';
import { provideMockResource } from '@constantant/openapi-resource-mocks';
import type {
  ProviderInitialBehavior,
  MockResourceMeta,
} from '@constantant/openapi-resource-mocks';
import { REPOS_CREATE_COMMIT_SIGNATURE_PROTECTION } from './repos-create-commit-signature-protection.token';
import type { ReposCreateCommitSignatureProtectionResponse } from './repos-create-commit-signature-protection.token';

const _meta: MockResourceMeta = {
  specId: 'github',
  operationId: 'repos/create-commit-signature-protection',
  path: '/repos/{owner}/{repo}/branches/{branch}/protection/required_signatures',
  method: 'post',
  tag: 'repos',
};

export function provideReposCreateCommitSignatureProtectionMock(
  initialBehavior?: ProviderInitialBehavior<ReposCreateCommitSignatureProtectionResponse>,
): FactoryProvider {
  return provideMockResource(
    REPOS_CREATE_COMMIT_SIGNATURE_PROTECTION,
    'REPOS_CREATE_COMMIT_SIGNATURE_PROTECTION',
    initialBehavior,
    _meta,
  );
}
