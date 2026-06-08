import { FactoryProvider } from '@angular/core';
import { provideMockResource } from '@constantant/openapi-resource-mocks';
import type { ProviderInitialBehavior } from '@constantant/openapi-resource-mocks';
import { CODE_SECURITY_ATTACH_CONFIGURATION } from './code-security-attach-configuration.token';
import type { CodeSecurityAttachConfigurationResponse } from './code-security-attach-configuration.token';

export function provideCodeSecurityAttachConfigurationMock(
  initialBehavior?: ProviderInitialBehavior<CodeSecurityAttachConfigurationResponse>,
): FactoryProvider {
  return provideMockResource(
    CODE_SECURITY_ATTACH_CONFIGURATION,
    'CODE_SECURITY_ATTACH_CONFIGURATION',
    initialBehavior,
  );
}
