import { InjectionToken, inject, FactoryProvider } from '@angular/core';
import { httpResource } from '@angular/common/http';
import type { paths } from '../schema.d';
import { TASKS_BASE_URL } from '../api-base-url.token';

export type GetTaskResponse =
  paths['/api/tasks/{id}']['get']['responses']['200']['content']['application/json'];

export const GET_TASK = new InjectionToken<
  (id: string) => ReturnType<typeof httpResource<GetTaskResponse>>
>('GET_TASK');

export function provideGetTask(): FactoryProvider {
  return {
    provide: GET_TASK,
    useFactory: () => {
      const base = inject(TASKS_BASE_URL);
      return (id: string) =>
        httpResource<GetTaskResponse>(() => ({
          url: `${base}/api/tasks/${id}`,
        }));
    },
  };
}
