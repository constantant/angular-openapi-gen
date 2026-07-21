import { InjectionToken, inject, Signal, FactoryProvider } from '@angular/core';
import { httpResource } from '@angular/common/http';
import { Validator, type Schema } from '@cfworker/json-schema';
import type { paths } from '../schema.d';
import { GITHUB_BASE_URL } from '../api-base-url.token';

export type ReposCreateDeploymentProtectionRuleBody = NonNullable<
  paths['/repos/{owner}/{repo}/environments/{environment_name}/deployment_protection_rules']['post']['requestBody']
>['content']['application/json'];

export type ReposCreateDeploymentProtectionRuleResponse =
  paths['/repos/{owner}/{repo}/environments/{environment_name}/deployment_protection_rules']['post']['responses']['201']['content']['application/json'];

const _responseSchema: Schema = {
  title: 'Deployment protection rule',
  description: 'Deployment protection rule',
  type: 'object',
  properties: {
    id: {
      type: 'integer',
      example: 3515,
      description: 'The unique identifier for the deployment protection rule.',
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
          description: 'The URL for the endpoint to get details about the app.',
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
};

function _validateResponse(
  value: unknown,
): ReposCreateDeploymentProtectionRuleResponse {
  const _result = new Validator(_responseSchema).validate(value);
  if (!_result.valid) {
    throw new Error(
      `ReposCreateDeploymentProtectionRule response failed schema validation: ${JSON.stringify(_result.errors)}`,
    );
  }
  return value as ReposCreateDeploymentProtectionRuleResponse;
}

export const REPOS_CREATE_DEPLOYMENT_PROTECTION_RULE = new InjectionToken<
  (
    environmentName: string,
    repo: string,
    owner: string,
    body:
      | ReposCreateDeploymentProtectionRuleBody
      | Signal<ReposCreateDeploymentProtectionRuleBody>,
  ) => ReturnType<
    typeof httpResource<ReposCreateDeploymentProtectionRuleResponse>
  >
>('REPOS_CREATE_DEPLOYMENT_PROTECTION_RULE');

export function provideReposCreateDeploymentProtectionRule(): FactoryProvider {
  return {
    provide: REPOS_CREATE_DEPLOYMENT_PROTECTION_RULE,
    useFactory: () => {
      const base = inject(GITHUB_BASE_URL);
      return (
        environmentName: string,
        repo: string,
        owner: string,
        body:
          | ReposCreateDeploymentProtectionRuleBody
          | Signal<ReposCreateDeploymentProtectionRuleBody>,
      ) =>
        httpResource<ReposCreateDeploymentProtectionRuleResponse>(
          () => ({
            url: `${base}/repos/${owner}/${repo}/environments/${environmentName}/deployment_protection_rules`,
            method: 'POST',
            body,
          }),
          { parse: _validateResponse },
        );
    },
  };
}
