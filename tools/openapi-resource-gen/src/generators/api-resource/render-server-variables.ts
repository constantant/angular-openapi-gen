/** Server URL templating: `servers[0].variables` become one InjectionToken each. */

interface ServerVariable {
  default?: unknown;
  enum?: unknown[];
}

interface ServerLike {
  url?: string;
  variables?: Record<string, ServerVariable>;
}

export interface ServerVariableModel {
  /** Name as written in the URL template, e.g. `region`. */
  name: string;
  /** Exported token, e.g. `API_REGION`. */
  tokenName: string;
  defaultValue: string;
  /** Allowed values, when the spec lists an `enum`. */
  allowed?: string[];
}

export interface ServerVariablesModel {
  urlTemplate: string;
  variables: ServerVariableModel[];
}

function toScreamingSnake(s: string): string {
  return s
    .replace(/([a-z0-9])([A-Z])/g, '$1_$2')
    .replace(/[^A-Za-z0-9]+/g, '_')
    .replace(/^_+|_+$/g, '')
    .toUpperCase();
}

/**
 * Variables of the first server whose URL actually references them.
 * Returns undefined when there is nothing to template.
 */
export function parseServerVariables(
  servers: unknown,
  baseUrlToken: string,
): ServerVariablesModel | undefined {
  const server = Array.isArray(servers)
    ? (servers[0] as ServerLike | undefined)
    : undefined;
  if (!server?.url || !server.variables) return undefined;

  const prefix = baseUrlToken.replace(/_BASE_URL$/i, '');
  const variables: ServerVariableModel[] = [];
  for (const [name, def] of Object.entries(server.variables)) {
    if (!server.url.includes(`{${name}}`)) continue;
    const allowed = Array.isArray(def.enum) ? def.enum.map(String) : undefined;
    const snake = toScreamingSnake(name);
    if (!snake) continue;
    variables.push({
      name,
      tokenName: prefix ? `${prefix}_${snake}` : snake,
      defaultValue: String(def.default ?? allowed?.[0] ?? ''),
      allowed: allowed?.length ? allowed : undefined,
    });
  }
  return variables.length ? { urlTemplate: server.url, variables } : undefined;
}

function escapeTemplate(s: string): string {
  return s.replace(/\\/g, '\\\\').replace(/`/g, '\\`').replace(/\$\{/g, '\\${');
}

export function renderServerVariablesFile(model: ServerVariablesModel): string {
  const tokens = model.variables.map((v) => {
    const type = v.allowed
      ? v.allowed.map((a) => JSON.stringify(a)).join(' | ')
      : 'string';
    return (
      '/** Server variable ' +
      v.name +
      ' (default ' +
      JSON.stringify(v.defaultValue) +
      '). */\n' +
      `export const ${v.tokenName} = new InjectionToken<${type}>(\n` +
      `  '${v.tokenName}',\n` +
      `  { providedIn: 'root', factory: () => ${JSON.stringify(v.defaultValue)} }\n` +
      `);\n`
    );
  });
  return `import { InjectionToken } from '@angular/core';\n\n${tokens.join('\n')}`;
}

export function renderBaseUrlFile(
  baseUrlToken: string,
  model?: ServerVariablesModel,
): string {
  if (!model) {
    return `import { InjectionToken } from '@angular/core';

export const ${baseUrlToken} = new InjectionToken<string>(
  '${baseUrlToken}',
  { providedIn: 'root', factory: () => '' }
);
`;
  }
  const byName = new Map(model.variables.map((v) => [v.name, v]));
  const url = escapeTemplate(model.urlTemplate).replace(
    /\{([^{}]+)\}/g,
    (whole, name: string) => {
      const v = byName.get(name);
      return v ? `\${inject(${v.tokenName})}` : whole;
    },
  );
  return `import { InjectionToken, inject } from '@angular/core';
import { ${model.variables.map((v) => v.tokenName).join(', ')} } from './server-variables.token';

/** Defaults to the first \`servers\` entry of the spec, built from its server-variable tokens. */
export const ${baseUrlToken} = new InjectionToken<string>(
  '${baseUrlToken}',
  { providedIn: 'root', factory: () => \`${url}\` }
);
`;
}
