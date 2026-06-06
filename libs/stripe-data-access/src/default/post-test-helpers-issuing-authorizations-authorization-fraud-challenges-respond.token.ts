import { InjectionToken, inject, Signal } from '@angular/core';
import { httpResource } from '@angular/common/http';
import type { paths } from '../schema.d';
import { STRIPE_BASE_URL } from '../api-base-url.token';

type PostTestHelpersIssuingAuthorizationsAuthorizationFraudChallengesRespondBody =
  NonNullable<
    paths['/v1/test_helpers/issuing/authorizations/{authorization}/fraud_challenges/respond']['post']['requestBody']
  >['content']['application/x-www-form-urlencoded'];

type PostTestHelpersIssuingAuthorizationsAuthorizationFraudChallengesRespondResponse =
  paths['/v1/test_helpers/issuing/authorizations/{authorization}/fraud_challenges/respond']['post']['responses']['200']['content']['application/json'];

export const POST_TEST_HELPERS_ISSUING_AUTHORIZATIONS_AUTHORIZATION_FRAUD_CHALLENGES_RESPOND =
  new InjectionToken<
    (
      authorization: string,
      body:
        | PostTestHelpersIssuingAuthorizationsAuthorizationFraudChallengesRespondBody
        | Signal<PostTestHelpersIssuingAuthorizationsAuthorizationFraudChallengesRespondBody>,
    ) => ReturnType<
      typeof httpResource<PostTestHelpersIssuingAuthorizationsAuthorizationFraudChallengesRespondResponse>
    >
  >(
    'POST_TEST_HELPERS_ISSUING_AUTHORIZATIONS_AUTHORIZATION_FRAUD_CHALLENGES_RESPOND',
    {
      providedIn: 'root',
      factory: () => {
        const base = inject(STRIPE_BASE_URL);
        return (
          authorization: string,
          body:
            | PostTestHelpersIssuingAuthorizationsAuthorizationFraudChallengesRespondBody
            | Signal<PostTestHelpersIssuingAuthorizationsAuthorizationFraudChallengesRespondBody>,
        ) =>
          httpResource<PostTestHelpersIssuingAuthorizationsAuthorizationFraudChallengesRespondResponse>(
            () => ({
              url: `${base}/v1/test_helpers/issuing/authorizations/${authorization}/fraud_challenges/respond`,
              method: 'POST',
              body,
            }),
          );
      },
    },
  );
