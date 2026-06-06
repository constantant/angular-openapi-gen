import { InjectionToken, inject, Signal, FactoryProvider } from '@angular/core';
import { httpResource } from '@angular/common/http';
import type { paths } from '../schema.d';
import { STRIPE_BASE_URL } from '../api-base-url.token';

export type PostTerminalOnboardingLinksBody = NonNullable<
  paths['/v1/terminal/onboarding_links']['post']['requestBody']
>['content']['application/x-www-form-urlencoded'];

export type PostTerminalOnboardingLinksResponse =
  paths['/v1/terminal/onboarding_links']['post']['responses']['200']['content']['application/json'];

export const POST_TERMINAL_ONBOARDING_LINKS = new InjectionToken<
  (
    body:
      | PostTerminalOnboardingLinksBody
      | Signal<PostTerminalOnboardingLinksBody>,
  ) => ReturnType<typeof httpResource<PostTerminalOnboardingLinksResponse>>
>('POST_TERMINAL_ONBOARDING_LINKS');

export function providePostTerminalOnboardingLinks(): FactoryProvider {
  return {
    provide: POST_TERMINAL_ONBOARDING_LINKS,
    useFactory: () => {
      const base = inject(STRIPE_BASE_URL);
      return (
        body:
          | PostTerminalOnboardingLinksBody
          | Signal<PostTerminalOnboardingLinksBody>,
      ) =>
        httpResource<PostTerminalOnboardingLinksResponse>(() => ({
          url: `${base}/v1/terminal/onboarding_links`,
          method: 'POST',
          body,
        }));
    },
  };
}
