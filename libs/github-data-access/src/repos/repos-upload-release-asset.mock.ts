import { FactoryProvider } from '@angular/core';
import { provideMockResource } from '@constantant/openapi-resource-mocks';
import type { ProviderInitialBehavior } from '@constantant/openapi-resource-mocks';
import { REPOS_UPLOAD_RELEASE_ASSET } from './repos-upload-release-asset.token';
import type { ReposUploadReleaseAssetResponse } from './repos-upload-release-asset.token';

export function provideReposUploadReleaseAssetMock(
  initialBehavior?: ProviderInitialBehavior<ReposUploadReleaseAssetResponse>,
): FactoryProvider {
  return provideMockResource(
    REPOS_UPLOAD_RELEASE_ASSET,
    'REPOS_UPLOAD_RELEASE_ASSET',
    initialBehavior,
  );
}
