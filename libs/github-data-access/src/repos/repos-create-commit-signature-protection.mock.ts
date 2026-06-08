import { FactoryProvider } from '@angular/core';
import { provideMockResource } from '@constantant/openapi-resource-mocks';
import type { ProviderInitialBehavior } from '@constantant/openapi-resource-mocks';
import { REPOS_CREATE_COMMIT_SIGNATURE_PROTECTION } from './repos-create-commit-signature-protection.token';
import type { ReposCreateCommitSignatureProtectionResponse } from './repos-create-commit-signature-protection.token';

export function provideReposCreateCommitSignatureProtectionMock(
  initialBehavior?: ProviderInitialBehavior<ReposCreateCommitSignatureProtectionResponse>,
): FactoryProvider {
  return provideMockResource(
    REPOS_CREATE_COMMIT_SIGNATURE_PROTECTION,
    'REPOS_CREATE_COMMIT_SIGNATURE_PROTECTION',
    initialBehavior,
  );
}
