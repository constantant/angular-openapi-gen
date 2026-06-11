import { FactoryProvider } from '@angular/core';
import { provideMockResource } from '@constantant/openapi-resource-mocks';
import type {
  ProviderInitialBehavior,
  MockResourceMeta,
} from '@constantant/openapi-resource-mocks';
import { REPOS_DELETE_COMMIT_SIGNATURE_PROTECTION } from './repos-delete-commit-signature-protection.token';

const _meta: MockResourceMeta = {
  specId: 'github',
  operationId: 'repos/delete-commit-signature-protection',
  path: '/repos/{owner}/{repo}/branches/{branch}/protection/required_signatures',
  method: 'delete',
  tag: 'repos',
};

export function provideReposDeleteCommitSignatureProtectionMock(
  initialBehavior?: ProviderInitialBehavior<unknown>,
): FactoryProvider {
  return provideMockResource(
    REPOS_DELETE_COMMIT_SIGNATURE_PROTECTION,
    'REPOS_DELETE_COMMIT_SIGNATURE_PROTECTION',
    initialBehavior,
    _meta,
  );
}
