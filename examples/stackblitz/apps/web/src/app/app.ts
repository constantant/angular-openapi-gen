import {
  Component,
  Injector,
  effect,
  inject,
  runInInjectionContext,
  signal,
} from '@angular/core';
import type { HttpResourceRef } from '@angular/common/http';
import {
  CREATE_TASK,
  DELETE_TASK,
  LIST_TASKS,
  UPDATE_TASK,
  type ListTasksParams,
} from '@org/tasks-data-access';

type Status = NonNullable<ListTasksParams>['status'];
const NEXT: Record<string, 'todo' | 'in-progress' | 'done'> = {
  todo: 'in-progress',
  'in-progress': 'done',
  done: 'todo',
};

@Component({
  selector: 'app-root',
  templateUrl: './app.html',
  styleUrl: './app.css',
})
export class App {
  private readonly injector = inject(Injector);
  private readonly createTask = inject(CREATE_TASK);
  private readonly updateTask = inject(UPDATE_TASK);
  private readonly deleteTask = inject(DELETE_TASK);

  protected readonly filters: (Status | undefined)[] = [undefined, 'todo', 'in-progress', 'done'];
  protected readonly status = signal<Status | undefined>(undefined);
  protected readonly newTitle = signal('');

  // Re-runs (and cancels the stale request) whenever `status` changes. An undefined status is
  // dropped from the query string by the generated token.
  protected readonly tasks = inject(LIST_TASKS)(() => ({ status: this.status() }));

  protected add() {
    const title = this.newTitle().trim();
    if (!title) return;
    this.mutate(() => this.createTask({ title }));
    this.newTitle.set('');
  }

  protected advance(id: number, status: string) {
    this.mutate(() => this.updateTask(String(id), { status: NEXT[status] }));
  }

  protected remove(id: number) {
    this.mutate(() => this.deleteTask(String(id)));
  }

  // Mutations are httpResources too: they fire when created, so create them on demand
  // and refresh the list once the request settles.
  private mutate(make: () => HttpResourceRef<unknown>) {
    runInInjectionContext(this.injector, () => {
      const request = make();
      const watcher = effect(() => {
        if (request.status() === 'resolved' || request.status() === 'error') {
          watcher.destroy();
          this.tasks.reload();
        }
      });
    });
  }
}
