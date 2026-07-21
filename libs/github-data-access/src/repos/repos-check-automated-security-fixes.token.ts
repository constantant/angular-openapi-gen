import { InjectionToken, inject, FactoryProvider } from '@angular/core';
import { httpResource } from '@angular/common/http';
import { Validator, type Schema } from '@cfworker/json-schema';
import type { paths } from '../schema.d';
import { GITHUB_BASE_URL } from '../api-base-url.token';

export type ReposCheckAutomatedSecurityFixesResponse =
  paths['/repos/{owner}/{repo}/automated-security-fixes']['get']['responses']['200']['content']['application/json'];

const _responseSchema: Schema = {
  title: 'Check Dependabot security updates',
  description: 'Check Dependabot security updates',
  type: 'object',
  properties: {
    enabled: {
      type: 'boolean',
      example: true,
      description:
        'Whether Dependabot security updates are enabled for the repository.',
    },
    paused: {
      type: 'boolean',
      example: false,
      description:
        'Whether Dependabot security updates are paused for the repository.',
    },
  },
  required: ['enabled', 'paused'],
};

function _validateResponse(
  value: unknown,
): ReposCheckAutomatedSecurityFixesResponse {
  const _result = new Validator(_responseSchema).validate(value);
  if (!_result.valid) {
    throw new Error(
      `ReposCheckAutomatedSecurityFixes response failed schema validation: ${JSON.stringify(_result.errors)}`,
    );
  }
  return value as ReposCheckAutomatedSecurityFixesResponse;
}

export const REPOS_CHECK_AUTOMATED_SECURITY_FIXES = new InjectionToken<
  (
    owner: string,
    repo: string,
  ) => ReturnType<typeof httpResource<ReposCheckAutomatedSecurityFixesResponse>>
>('REPOS_CHECK_AUTOMATED_SECURITY_FIXES');

export function provideReposCheckAutomatedSecurityFixes(): FactoryProvider {
  return {
    provide: REPOS_CHECK_AUTOMATED_SECURITY_FIXES,
    useFactory: () => {
      const base = inject(GITHUB_BASE_URL);
      return (owner: string, repo: string) =>
        httpResource<ReposCheckAutomatedSecurityFixesResponse>(
          () => ({
            url: `${base}/repos/${owner}/${repo}/automated-security-fixes`,
          }),
          { parse: _validateResponse },
        );
    },
  };
}
