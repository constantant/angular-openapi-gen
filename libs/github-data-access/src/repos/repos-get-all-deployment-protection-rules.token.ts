import { InjectionToken, inject, FactoryProvider } from '@angular/core';
import { httpResource } from '@angular/common/http';
import { Validator, type Schema } from '@cfworker/json-schema';
import type { paths } from '../schema.d';
import { GITHUB_BASE_URL } from '../api-base-url.token';

export type ReposGetAllDeploymentProtectionRulesResponse =
  paths['/repos/{owner}/{repo}/environments/{environment_name}/deployment_protection_rules']['get']['responses']['200']['content']['application/json'];

const _responseSchema: Schema = {
  type: 'object',
  properties: {
    total_count: {
      description:
        'The number of enabled custom deployment protection rules for this environment',
      type: 'integer',
      example: 10,
    },
    custom_deployment_protection_rules: {
      type: 'array',
      items: {
        title: 'Deployment protection rule',
        description: 'Deployment protection rule',
        type: 'object',
        properties: {
          id: {
            type: 'integer',
            example: 3515,
            description:
              'The unique identifier for the deployment protection rule.',
          },
          node_id: {
            type: 'string',
            example: 'MDQ6R2F0ZTM1MTU=',
            description: 'The node ID for the deployment protection rule.',
          },
          enabled: {
            type: 'boolean',
            example: true,
            description:
              'Whether the deployment protection rule is enabled for the environment.',
          },
          app: {
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
        required: ['id', 'node_id', 'enabled', 'app'],
      },
    },
  },
  example: {
    value: [
      {
        total_count: 2,
      },
      {
        custom_deployment_protection_rules: [
          {
            id: 3,
            node_id: 'IEH37kRlcGxveW1lbnRTdGF0ddiv',
            enabled: true,
            app: {
              id: 1,
              node_id: 'GHT58kRlcGxveW1lbnRTdTY!bbcy',
              slug: 'a-custom-app',
              integration_url: 'https://api.github.com/apps/a-custom-app',
            },
          },
          {
            id: 4,
            node_id: 'MDE2OkRlcGxveW1lbnRTdHJ41128',
            enabled: true,
            app: {
              id: 1,
              node_id: 'UHVE67RlcGxveW1lbnRTdTY!jfeuy',
              slug: 'another-custom-app',
              integration_url: 'https://api.github.com/apps/another-custom-app',
            },
          },
        ],
      },
    ],
  },
};

function _validateResponse(
  value: unknown,
): ReposGetAllDeploymentProtectionRulesResponse {
  const _result = new Validator(_responseSchema).validate(value);
  if (!_result.valid) {
    throw new Error(
      `ReposGetAllDeploymentProtectionRules response failed schema validation: ${JSON.stringify(_result.errors)}`,
    );
  }
  return value as ReposGetAllDeploymentProtectionRulesResponse;
}

export const REPOS_GET_ALL_DEPLOYMENT_PROTECTION_RULES = new InjectionToken<
  (
    environmentName: string,
    repo: string,
    owner: string,
  ) => ReturnType<
    typeof httpResource<ReposGetAllDeploymentProtectionRulesResponse>
  >
>('REPOS_GET_ALL_DEPLOYMENT_PROTECTION_RULES');

export function provideReposGetAllDeploymentProtectionRules(): FactoryProvider {
  return {
    provide: REPOS_GET_ALL_DEPLOYMENT_PROTECTION_RULES,
    useFactory: () => {
      const base = inject(GITHUB_BASE_URL);
      return (environmentName: string, repo: string, owner: string) =>
        httpResource<ReposGetAllDeploymentProtectionRulesResponse>(
          () => ({
            url: `${base}/repos/${owner}/${repo}/environments/${environmentName}/deployment_protection_rules`,
          }),
          { parse: _validateResponse },
        );
    },
  };
}
