export interface paths {
  '/api/tasks': {
    parameters: {
      query?: never;
      header?: never;
      path?: never;
      cookie?: never;
    };
    /** List tasks */
    get: operations['listTasks'];
    put?: never;
    /** Create a task */
    post: operations['createTask'];
    delete?: never;
    options?: never;
    head?: never;
    patch?: never;
    trace?: never;
  };
  '/api/tasks/{id}': {
    parameters: {
      query?: never;
      header?: never;
      path?: never;
      cookie?: never;
    };
    /** Get one task */
    get: operations['getTask'];
    put?: never;
    post?: never;
    /** Delete a task */
    delete: operations['deleteTask'];
    options?: never;
    head?: never;
    /** Update a task */
    patch: operations['updateTask'];
    trace?: never;
  };
}
export type webhooks = Record<string, never>;
export interface components {
  schemas: {
    /** @enum {string} */
    TaskStatus: 'todo' | 'in-progress' | 'done';
    Task: {
      /** @example 1 */
      id: number;
      /** @example Write the docs */
      title: string;
      /** @example Cover the generator options */
      description?: string;
      status: components['schemas']['TaskStatus'];
      /** Format: date-time */
      createdAt: string;
    };
    CreateTaskDto: {
      /** @example Write the docs */
      title: string;
      description?: string;
    };
    UpdateTaskDto: {
      /** @example Write the docs */
      title?: string;
      description?: string;
      status?: components['schemas']['TaskStatus'];
    };
  };
  responses: never;
  parameters: never;
  requestBodies: never;
  headers: never;
  pathItems: never;
}
export type $defs = Record<string, never>;
export interface operations {
  listTasks: {
    parameters: {
      query?: {
        status?: components['schemas']['TaskStatus'];
        limit?: number;
      };
      header?: never;
      path?: never;
      cookie?: never;
    };
    requestBody?: never;
    responses: {
      200: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          'application/json': components['schemas']['Task'][];
        };
      };
    };
  };
  createTask: {
    parameters: {
      query?: never;
      header?: never;
      path?: never;
      cookie?: never;
    };
    requestBody: {
      content: {
        'application/json': components['schemas']['CreateTaskDto'];
      };
    };
    responses: {
      201: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          'application/json': components['schemas']['Task'];
        };
      };
    };
  };
  getTask: {
    parameters: {
      query?: never;
      header?: never;
      path: {
        id: number;
      };
      cookie?: never;
    };
    requestBody?: never;
    responses: {
      200: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          'application/json': components['schemas']['Task'];
        };
      };
      404: {
        headers: {
          [name: string]: unknown;
        };
        content?: never;
      };
    };
  };
  deleteTask: {
    parameters: {
      query?: never;
      header?: never;
      path: {
        id: number;
      };
      cookie?: never;
    };
    requestBody?: never;
    responses: {
      204: {
        headers: {
          [name: string]: unknown;
        };
        content?: never;
      };
      404: {
        headers: {
          [name: string]: unknown;
        };
        content?: never;
      };
    };
  };
  updateTask: {
    parameters: {
      query?: never;
      header?: never;
      path: {
        id: number;
      };
      cookie?: never;
    };
    requestBody: {
      content: {
        'application/json': components['schemas']['UpdateTaskDto'];
      };
    };
    responses: {
      200: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          'application/json': components['schemas']['Task'];
        };
      };
      404: {
        headers: {
          [name: string]: unknown;
        };
        content?: never;
      };
    };
  };
}
