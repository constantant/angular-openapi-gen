import { InjectionToken, inject, FactoryProvider } from '@angular/core';
import { httpResource } from '@angular/common/http';
import { Validator, type Schema } from '@cfworker/json-schema';
import type { paths } from '../schema.d';
import { GITHUB_BASE_URL } from '../api-base-url.token';

export type ReposListCustomDeploymentRuleIntegrationsParams =
  paths['/repos/{owner}/{repo}/environments/{environment_name}/deployment_protection_rules/apps']['get']['parameters']['query'];

export type ReposListCustomDeploymentRuleIntegrationsResponse =
  paths['/repos/{owner}/{repo}/environments/{environment_name}/deployment_protection_rules/apps']['get']['responses']['200']['content']['application/json'];

const _responseSchema: Schema = {
  type: 'object',
  properties: {
    total_count: {
      description:
        'The total number of custom deployment protection rule integrations available for this environment.',
      type: 'integer',
      example: 35,
    },
    available_custom_deployment_protection_rule_integrations: {
      type: 'array',
      items: {
        title: 'Custom deployment protection rule app',
        description:
          'A GitHub App that is providing a custom deployment protection rule.',
        type: 'object',
        properties: {
          id: {
            type: 'integer',
            example: 3515,
            description:
              'The unique identifier of the deployment protection rule integration.',
          },
          slug: {
            type: 'string',
            example: 'my-custom-app',
            description:
              'The slugified name of the deployment protection rule integration.',
          },
          integration_url: {
            type: 'string',
            example: 'https://api.github.com/apps/custom-app-slug',
            description:
              'The URL for the endpoint to get details about the app.',
          },
          node_id: {
            type: 'string',
            example: 'MDQ6R2F0ZTM1MTU=',
            description:
              'The node ID for the deployment protection rule integration.',
          },
        },
        required: ['id', 'slug', 'integration_url', 'node_id'],
      },
    },
  },
};

function _validateResponse(
  value: unknown,
): ReposListCustomDeploymentRuleIntegrationsResponse {
  const _result = new Validator(_responseSchema).validate(value);
  if (!_result.valid) {
    throw new Error(
      `ReposListCustomDeploymentRuleIntegrations response failed schema validation: ${JSON.stringify(_result.errors)}`,
    );
  }
  return value as ReposListCustomDeploymentRuleIntegrationsResponse;
}

export const REPOS_LIST_CUSTOM_DEPLOYMENT_RULE_INTEGRATIONS =
  new InjectionToken<
    (
      environmentName: string,
      repo: string,
      owner: string,
      params?:
        | ReposListCustomDeploymentRuleIntegrationsParams
        | (() => ReposListCustomDeploymentRuleIntegrationsParams | undefined),
    ) => ReturnType<
      typeof httpResource<ReposListCustomDeploymentRuleIntegrationsResponse>
    >
  >('REPOS_LIST_CUSTOM_DEPLOYMENT_RULE_INTEGRATIONS');

export function provideReposListCustomDeploymentRuleIntegrations(): FactoryProvider {
  return {
    provide: REPOS_LIST_CUSTOM_DEPLOYMENT_RULE_INTEGRATIONS,
    useFactory: () => {
      const base = inject(GITHUB_BASE_URL);
      return (
        environmentName: string,
        repo: string,
        owner: string,
        params?:
          | ReposListCustomDeploymentRuleIntegrationsParams
          | (() => ReposListCustomDeploymentRuleIntegrationsParams | undefined),
      ) =>
        httpResource<ReposListCustomDeploymentRuleIntegrationsResponse>(
          () => {
            const _params = typeof params === 'function' ? params() : params;
            if (typeof params === 'function' && _params === undefined)
              return undefined;
            return {
              url: `${base}/repos/${owner}/${repo}/environments/${environmentName}/deployment_protection_rules/apps`,
              params: _params as unknown as Record<
                string,
                | string
                | number
                | boolean
                | readonly (string | number | boolean)[]
              >,
            };
          },
          { parse: _validateResponse },
        );
    },
  };
}
