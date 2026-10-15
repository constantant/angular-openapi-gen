import { InjectionToken, inject, FactoryProvider } from '@angular/core';
import { httpResource } from '@angular/common/http';
import type { paths } from '../schema.d';
import { TASKS_BASE_URL } from '../api-base-url.token';

export type ListTasksParams = paths['/api/tasks']['get']['parameters']['query'];

export type ListTasksResponse =
  paths['/api/tasks']['get']['responses']['200']['content']['application/json'];

export const LIST_TASKS = new InjectionToken<
  (
    params?: ListTasksParams | (() => ListTasksParams | undefined),
  ) => ReturnType<typeof httpResource<ListTasksResponse>>
>('LIST_TASKS');

export function provideListTasks(): FactoryProvider {
  return {
    provide: LIST_TASKS,
    useFactory: () => {
      const base = inject(TASKS_BASE_URL);
      return (params?: ListTasksParams | (() => ListTasksParams | undefined)) =>
        httpResource<ListTasksResponse>(() => {
          const _params = typeof params === 'function' ? params() : params;
          if (typeof params === 'function' && _params === undefined)
            return undefined;
          return {
            url: `${base}/api/tasks`,
            params: _params as unknown as Record<
              string,
              string | number | boolean | readonly (string | number | boolean)[]
            >,
          };
        });
    },
  };
}
