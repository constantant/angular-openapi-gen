import { InjectionToken, inject, FactoryProvider } from '@angular/core';
import { httpResource } from '@angular/common/http';
import type { paths } from '../schema.d';
import { TASKS_BASE_URL } from '../api-base-url.token';

export const DELETE_TASK = new InjectionToken<
  (id: string) => ReturnType<typeof httpResource<unknown>>
>('DELETE_TASK');

export function provideDeleteTask(): FactoryProvider {
  return {
    provide: DELETE_TASK,
    useFactory: () => {
      const base = inject(TASKS_BASE_URL);
      return (id: string) =>
        httpResource<unknown>(() => ({
          url: `${base}/api/tasks/${id}`,
          method: 'DELETE',
        }));
    },
  };
}
