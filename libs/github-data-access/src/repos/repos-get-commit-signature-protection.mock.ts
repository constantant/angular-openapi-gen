import { FactoryProvider } from '@angular/core';
import { provideMockResource } from '@constantant/openapi-resource-mocks';
import type { ProviderInitialBehavior } from '@constantant/openapi-resource-mocks';
import { REPOS_GET_COMMIT_SIGNATURE_PROTECTION } from './repos-get-commit-signature-protection.token';
import type { ReposGetCommitSignatureProtectionResponse } from './repos-get-commit-signature-protection.token';

export function provideReposGetCommitSignatureProtectionMock(
  initialBehavior?: ProviderInitialBehavior<ReposGetCommitSignatureProtectionResponse>,
): FactoryProvider {
  return provideMockResource(
    REPOS_GET_COMMIT_SIGNATURE_PROTECTION,
    'REPOS_GET_COMMIT_SIGNATURE_PROTECTION',
    initialBehavior,
  );
}
