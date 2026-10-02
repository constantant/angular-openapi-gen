export interface MockResourceMeta {
  specId:      string;
  operationId: string;
  path:        string;
  /** Lowercase HTTP method: 'get' | 'post' | 'put' | 'patch' | 'delete' | 'head' | 'options' */
  method:      string;
  tag?:        string;
  /**
   * The names of the token function's arguments, in order (e.g. `['petId', 'body', 'params', 'options']`).
   * DevTools uses it to label each argument of a recorded request. Emitted by `--callOptions`.
   */
  args?:       readonly string[];
}
