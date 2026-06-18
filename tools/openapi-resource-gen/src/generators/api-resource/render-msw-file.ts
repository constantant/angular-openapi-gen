import type { EndpointModel } from './endpoint-model';
import { toPascalCase } from './render-token';

function toCamelCase(str: string): string {
  const parts = str.split(/[-_.]+/).filter(Boolean);
  if (parts.length === 0) return str;
  const first = parts[0].charAt(0).toLowerCase() + parts[0].slice(1);
  return first + parts.slice(1).map((s) => s.charAt(0).toUpperCase() + s.slice(1)).join('');
}

/** Convert OpenAPI path template {param} to MSW :param notation. */
function toMswPath(apiPath: string): string {
  return apiPath.replace(/\{([\w-]+)\}/g, ':$1');
}

export function renderMswFile(ep: EndpointModel): string {
  const pascal = toPascalCase(ep.operationId);
  const camel = toCamelCase(ep.operationId);
  const mswPath = toMswPath(ep.apiPath);
  const method = ep.method.toLowerCase();

  const lines: string[] = [];
  lines.push(`import { http, HttpResponse } from 'msw';`);
  if (ep.hasResponse) {
    lines.push(`import type { ${pascal}Response } from './${ep.fileName}.token';`);
  }
  lines.push('');

  if (ep.hasResponse) {
    const primaryStatus = parseInt(ep.responseStatuses[0] ?? '200', 10);
    const statusArg = primaryStatus !== 200 ? `, { status: ${primaryStatus} }` : '';
    lines.push(`export function ${camel}Handler(body?: ${pascal}Response | null) {`);
    lines.push(`  return http.${method}('${mswPath}', () => HttpResponse.json(body ?? null${statusArg}));`);
    lines.push(`}`);
  } else {
    // No JSON response body — return an empty response with a sensible status.
    const noBodyStatus = ep.method === 'delete' ? 204 : 200;
    lines.push(`export function ${camel}Handler() {`);
    lines.push(`  return http.${method}('${mswPath}', () => new HttpResponse(null, { status: ${noBodyStatus} }));`);
    lines.push(`}`);
  }
  lines.push('');
  lines.push(`export const ${camel}Handlers = [${camel}Handler()];`);
  lines.push('');

  return lines.join('\n');
}
