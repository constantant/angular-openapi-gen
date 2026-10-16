import { InjectionToken, inject, Signal, FactoryProvider } from '@angular/core';
import { httpResource } from '@angular/common/http';
import type { paths } from '../schema.d';
import { TASKS_BASE_URL } from '../api-base-url.token';

export type UpdateTaskBody = NonNullable<
  paths['/api/tasks/{id}']['patch']['requestBody']
>['content']['application/json'];

export type UpdateTaskResponse =
  paths['/api/tasks/{id}']['patch']['responses']['200']['content']['application/json'];

export const UPDATE_TASK = new InjectionToken<
  (
    id: string,
    body: UpdateTaskBody | Signal<UpdateTaskBody>,
  ) => ReturnType<typeof httpResource<UpdateTaskResponse>>
>('UPDATE_TASK');

export function provideUpdateTask(): FactoryProvider {
  return {
    provide: UPDATE_TASK,
    useFactory: () => {
      const base = inject(TASKS_BASE_URL);
      return (id: string, body: UpdateTaskBody | Signal<UpdateTaskBody>) =>
        httpResource<UpdateTaskResponse>(() => {
          const _body =
            typeof body === 'function'
              ? (body as Signal<UpdateTaskBody>)()
              : body;
          return {
            url: `${base}/api/tasks/${id}`,
            method: 'PATCH',
            body: _body,
          };
        });
    },
  };
}
