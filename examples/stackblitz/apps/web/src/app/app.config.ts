import { ApplicationConfig, provideBrowserGlobalErrorListeners } from '@angular/core';
import { provideHttpClient } from '@angular/common/http';
import {
  provideCreateTask,
  provideDeleteTask,
  provideListTasks,
  provideUpdateTask,
} from '@org/tasks-data-access';

// Each generated endpoint is opt-in: only the tokens provided (and injected) end up in the bundle.
export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideHttpClient(),
    provideListTasks(),
    provideCreateTask(),
    provideUpdateTask(),
    provideDeleteTask(),
  ],
};
