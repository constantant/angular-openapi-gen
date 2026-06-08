import { FactoryProvider } from '@angular/core';
import { provideMockResource } from '@constantant/openapi-resource-mocks';
import type { ProviderInitialBehavior } from '@constantant/openapi-resource-mocks';
import { REPOS_DELETE_COMMIT_SIGNATURE_PROTECTION } from './repos-delete-commit-signature-protection.token';

export function provideReposDeleteCommitSignatureProtectionMock(
  initialBehavior?: ProviderInitialBehavior<unknown>,
): FactoryProvider {
  return provideMockResource(
    REPOS_DELETE_COMMIT_SIGNATURE_PROTECTION,
    'REPOS_DELETE_COMMIT_SIGNATURE_PROTECTION',
    initialBehavior,
  );
}
