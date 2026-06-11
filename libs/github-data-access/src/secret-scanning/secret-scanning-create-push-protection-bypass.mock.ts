import { FactoryProvider } from '@angular/core';
import { provideMockResource } from '@constantant/openapi-resource-mocks';
import type {
  ProviderInitialBehavior,
  MockResourceMeta,
} from '@constantant/openapi-resource-mocks';
import { SECRET_SCANNING_CREATE_PUSH_PROTECTION_BYPASS } from './secret-scanning-create-push-protection-bypass.token';
import type { SecretScanningCreatePushProtectionBypassResponse } from './secret-scanning-create-push-protection-bypass.token';

const _meta: MockResourceMeta = {
  specId: 'github',
  operationId: 'secret-scanning/create-push-protection-bypass',
  path: '/repos/{owner}/{repo}/secret-scanning/push-protection-bypasses',
  method: 'post',
  tag: 'secret-scanning',
};

export function provideSecretScanningCreatePushProtectionBypassMock(
  initialBehavior?: ProviderInitialBehavior<SecretScanningCreatePushProtectionBypassResponse>,
): FactoryProvider {
  return provideMockResource(
    SECRET_SCANNING_CREATE_PUSH_PROTECTION_BYPASS,
    'SECRET_SCANNING_CREATE_PUSH_PROTECTION_BYPASS',
    initialBehavior,
    _meta,
  );
}
