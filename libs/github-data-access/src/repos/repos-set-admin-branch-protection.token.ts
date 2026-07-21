import { InjectionToken, inject, FactoryProvider } from '@angular/core';
import { httpResource } from '@angular/common/http';
import { Validator, type Schema } from '@cfworker/json-schema';
import type { paths } from '../schema.d';
import { GITHUB_BASE_URL } from '../api-base-url.token';

export type ReposSetAdminBranchProtectionResponse =
  paths['/repos/{owner}/{repo}/branches/{branch}/protection/enforce_admins']['post']['responses']['200']['content']['application/json'];

const _responseSchema: Schema = {
  title: 'Protected Branch Admin Enforced',
  description: 'Protected Branch Admin Enforced',
  type: 'object',
  properties: {
    url: {
      type: 'string',
      format: 'uri',
      example:
        'https://api.github.com/repos/octocat/Hello-World/branches/master/protection/enforce_admins',
    },
    enabled: {
      type: 'boolean',
      example: true,
    },
  },
  required: ['url', 'enabled'],
};

function _validateResponse(
  value: unknown,
): ReposSetAdminBranchProtectionResponse {
  const _result = new Validator(_responseSchema).validate(value);
  if (!_result.valid) {
    throw new Error(
      `ReposSetAdminBranchProtection response failed schema validation: ${JSON.stringify(_result.errors)}`,
    );
  }
  return value as ReposSetAdminBranchProtectionResponse;
}

export const REPOS_SET_ADMIN_BRANCH_PROTECTION = new InjectionToken<
  (
    owner: string,
    repo: string,
    branch: string,
  ) => ReturnType<typeof httpResource<ReposSetAdminBranchProtectionResponse>>
>('REPOS_SET_ADMIN_BRANCH_PROTECTION');

export function provideReposSetAdminBranchProtection(): FactoryProvider {
  return {
    provide: REPOS_SET_ADMIN_BRANCH_PROTECTION,
    useFactory: () => {
      const base = inject(GITHUB_BASE_URL);
      return (owner: string, repo: string, branch: string) =>
        httpResource<ReposSetAdminBranchProtectionResponse>(
          () => ({
            url: `${base}/repos/${owner}/${repo}/branches/${branch}/protection/enforce_admins`,
            method: 'POST',
          }),
          { parse: _validateResponse },
        );
    },
  };
}
