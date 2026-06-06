import { InjectionToken, inject } from '@angular/core';
import { httpResource } from '@angular/common/http';
import type { paths } from '../schema.d';
import { GITHUB_BASE_URL } from '../api-base-url.token';

export type CopilotGetCopilotCloudAgentConfigurationResponse =
  paths['/repos/{owner}/{repo}/copilot/cloud-agent/configuration']['get']['responses']['200']['content']['application/json'];

export const COPILOT_GET_COPILOT_CLOUD_AGENT_CONFIGURATION = new InjectionToken<
  (
    owner: string,
    repo: string,
  ) => ReturnType<
    typeof httpResource<CopilotGetCopilotCloudAgentConfigurationResponse>
  >
>('COPILOT_GET_COPILOT_CLOUD_AGENT_CONFIGURATION', {
  providedIn: 'root',
  factory: () => {
    const base = inject(GITHUB_BASE_URL);
    return (owner: string, repo: string) =>
      httpResource<CopilotGetCopilotCloudAgentConfigurationResponse>(() => ({
        url: `${base}/repos/${owner}/${repo}/copilot/cloud-agent/configuration`,
      }));
  },
});
