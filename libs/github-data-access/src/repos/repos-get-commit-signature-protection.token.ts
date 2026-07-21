import { InjectionToken, inject, FactoryProvider } from '@angular/core';
import { httpResource } from '@angular/common/http';
import { Validator, type Schema } from '@cfworker/json-schema';
import type { paths } from '../schema.d';
import { GITHUB_BASE_URL } from '../api-base-url.token';

export type ReposGetCommitSignatureProtectionResponse =
  paths['/repos/{owner}/{repo}/branches/{branch}/protection/required_signatures']['get']['responses']['200']['content']['application/json'];

export type ReposGetCommitSignatureProtectionError =
  paths['/repos/{owner}/{repo}/branches/{branch}/protection/required_signatures']['get']['responses']['404']['content']['application/json'];

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
): ReposGetCommitSignatureProtectionResponse {
  const _result = new Validator(_responseSchema).validate(value);
  if (!_result.valid) {
    throw new Error(
      `ReposGetCommitSignatureProtection response failed schema validation: ${JSON.stringify(_result.errors)}`,
    );
  }
  return value as ReposGetCommitSignatureProtectionResponse;
}

export const REPOS_GET_COMMIT_SIGNATURE_PROTECTION = new InjectionToken<
  (
    owner: string,
    repo: string,
    branch: string,
  ) => ReturnType<
    typeof httpResource<ReposGetCommitSignatureProtectionResponse>
  >
>('REPOS_GET_COMMIT_SIGNATURE_PROTECTION');

export function provideReposGetCommitSignatureProtection(): FactoryProvider {
  return {
    provide: REPOS_GET_COMMIT_SIGNATURE_PROTECTION,
    useFactory: () => {
      const base = inject(GITHUB_BASE_URL);
      return (owner: string, repo: string, branch: string) =>
        httpResource<ReposGetCommitSignatureProtectionResponse>(
          () => ({
            url: `${base}/repos/${owner}/${repo}/branches/${branch}/protection/required_signatures`,
          }),
          { parse: _validateResponse },
        );
    },
  };
}
