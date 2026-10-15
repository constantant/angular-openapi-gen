import { InjectionToken, inject, Signal, FactoryProvider } from '@angular/core';
import { httpResource } from '@angular/common/http';
import type { paths } from '../schema.d';
import { TASKS_BASE_URL } from '../api-base-url.token';

export type CreateTaskBody = NonNullable<
  paths['/api/tasks']['post']['requestBody']
>['content']['application/json'];

export type CreateTaskResponse =
  paths['/api/tasks']['post']['responses']['201']['content']['application/json'];

export const CREATE_TASK = new InjectionToken<
  (
    body: CreateTaskBody | Signal<CreateTaskBody>,
  ) => ReturnType<typeof httpResource<CreateTaskResponse>>
>('CREATE_TASK');

export function provideCreateTask(): FactoryProvider {
  return {
    provide: CREATE_TASK,
    useFactory: () => {
      const base = inject(TASKS_BASE_URL);
      return (body: CreateTaskBody | Signal<CreateTaskBody>) =>
        httpResource<CreateTaskResponse>(() => {
          const _body =
            typeof body === 'function'
              ? (body as Signal<CreateTaskBody>)()
              : body;
          return {
            url: `${base}/api/tasks`,
            method: 'POST',
            body: _body,
          };
        });
    },
  };
}
