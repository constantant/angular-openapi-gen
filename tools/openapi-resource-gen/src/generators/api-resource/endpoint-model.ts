export type SecurityKind =
  | 'bearer'
  | 'basic'
  | 'digest'
  | 'apiKey-header'
  | 'apiKey-query'
  | 'oauth2'
  | 'openIdConnect';

export interface SecuritySchemeModel {
  schemeName: string;
  kind: SecurityKind;
  /** Header name (apiKey-header) or query param name (apiKey-query). */
  apiKeyParamName?: string;
  /** SCREAMING_SNAKE constant exported from the security token file. */
  tokenName: string;
  /** Kebab file name without extension, e.g. `bearer-auth.security-token`. */
  fileName: string;
}

export interface EndpointModel {
  tag: string;
  operationId: string;
  method: string;
  apiPath: string;
  pathParams: string[];
  headerParams: Array<{ name: string; required: boolean }>;
  tokenName: string;
  fileName: string;
  hasQueryParams: boolean;
  hasBody: boolean;
  hasResponse: boolean;
  responseStatus: string | null;
  bodyContentType: string | null;
  /** Names of security schemes that apply to this endpoint (resolved from global + operation level). */
  securitySchemeNames: string[];
}
