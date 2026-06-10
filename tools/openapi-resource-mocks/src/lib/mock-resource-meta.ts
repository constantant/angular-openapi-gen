export interface MockResourceMeta {
  specId:      string;
  operationId: string;
  path:        string;
  /** Lowercase HTTP method: 'get' | 'post' | 'put' | 'patch' | 'delete' | 'head' | 'options' */
  method:      string;
  tag?:        string;
}
