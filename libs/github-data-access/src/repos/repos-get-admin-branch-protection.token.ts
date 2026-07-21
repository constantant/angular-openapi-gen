import { InjectionToken, inject, FactoryProvider } from '@angular/core';
import { httpResource } from '@angular/common/http';
import { Validator, type Schema } from '@cfworker/json-schema';
import type { paths } from '../schema.d';
import { GITHUB_BASE_URL } from '../api-base-url.token';

export type ReposGetAdminBranchProtectionResponse =
  paths['/repos/{owner}/{repo}/branches/{branch}/protection/enforce_admins']['get']['responses']['200']['content']['application/json'];

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
): ReposGetAdminBranchProtectionResponse {
  const _result = new Validator(_responseSchema).validate(value);
  if (!_result.valid) {
    throw new Error(
      `ReposGetAdminBranchProtection response failed schema validation: ${JSON.stringify(_result.errors)}`,
    );
  }
  return value as ReposGetAdminBranchProtectionResponse;
}

export const REPOS_GET_ADMIN_BRANCH_PROTECTION = new InjectionToken<
  (
    owner: string,
    repo: string,
    branch: string,
  ) => ReturnType<typeof httpResource<ReposGetAdminBranchProtectionResponse>>
>('REPOS_GET_ADMIN_BRANCH_PROTECTION');

export function provideReposGetAdminBranchProtection(): FactoryProvider {
  return {
    provide: REPOS_GET_ADMIN_BRANCH_PROTECTION,
    useFactory: () => {
      const base = inject(GITHUB_BASE_URL);
      return (owner: string, repo: string, branch: string) =>
        httpResource<ReposGetAdminBranchProtectionResponse>(
          () => ({
            url: `${base}/repos/${owner}/${repo}/branches/${branch}/protection/enforce_admins`,
          }),
          { parse: _validateResponse },
        );
    },
  };
}
