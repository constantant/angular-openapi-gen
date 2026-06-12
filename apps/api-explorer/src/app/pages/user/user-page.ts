import {
  Component,
  Injector,
  WritableSignal,
  computed,
  effect,
  inject,
  runInInjectionContext,
  signal,
  untracked,
} from '@angular/core';
import {
  LOGIN_USER,
  LOGOUT_USER,
  GET_USER_BY_NAME,
  CREATE_USER,
  DELETE_USER,
  type GetUserByNameResponse,
  type CreateUserBody,
  type LoginUserParams,
} from '@angular-openapi-gen/petstore-data-access';
import { PETSTORE_SESSION } from '../../app.config';
import { MatButtonModule } from '@angular/material/button';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatDividerModule } from '@angular/material/divider';
import { MatTooltipModule } from '@angular/material/tooltip';

type User = GetUserByNameResponse;
interface ResourceRef<T> {
  isLoading: () => boolean;
  error: () => unknown;
  value: () => T | undefined;
  status: () => string;
}

@Component({
  selector: 'app-user-page',
  imports: [
    MatButtonModule,
    MatProgressBarModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    MatDividerModule,
    MatTooltipModule,
  ],
  templateUrl: './user-page.html',
  styleUrl: './user-page.less',
})
export class UserPageComponent {
  private readonly injector = inject(Injector);
  private readonly session = inject(PETSTORE_SESSION);
  private readonly loginFn = inject(LOGIN_USER);
  private readonly logoutFn = inject(LOGOUT_USER);
  private readonly getUserFn = inject(GET_USER_BY_NAME);
  private readonly createUserFn = inject(CREATE_USER);
  private readonly deleteUserFn = inject(DELETE_USER);

  readonly isLoggedIn = computed(() => this.session() !== null);

  // ── Login ─────────────────────────────────────────────────────────────────
  readonly loginUsername = signal('');
  readonly loginPassword = signal('');
  readonly loginLoading = signal(false);
  readonly loginError = signal<string | null>(null);

  // ── Find user ─────────────────────────────────────────────────────────────
  readonly searchUsername = signal('');
  readonly foundUser = signal<ResourceRef<User> | null>(null);
  readonly deletingUser = signal(false);

  // ── Create user ───────────────────────────────────────────────────────────
  readonly createUsername = signal('');
  readonly createFirstName = signal('');
  readonly createLastName = signal('');
  readonly createEmail = signal('');
  readonly createPassword = signal('');
  readonly createPhone = signal('');
  readonly createLoading = signal(false);
  readonly createSuccess = signal(false);
  readonly createError = signal<string | null>(null);

  login(): void {
    const username = this.loginUsername().trim();
    const password = this.loginPassword().trim();
    if (!username || !password || this.loginLoading()) return;
    this.loginError.set(null);
    this.loginLoading.set(true);

    const params: LoginUserParams = { username, password };
    const op = runInInjectionContext(this.injector, () => this.loginFn(params));
    effect(() => {
      const s = op.status();
      if (s === 'resolved') {
        untracked(() => {
          const token = op.value() as string | undefined;
          (this.session as WritableSignal<string | null>).set(token ?? null);
          this.loginUsername.set('');
          this.loginPassword.set('');
          this.loginLoading.set(false);
        });
      } else if (s === 'error') {
        untracked(() => {
          this.loginError.set('Login failed. Check credentials.');
          this.loginLoading.set(false);
        });
      }
    }, { injector: this.injector });
  }

  logout(): void {
    runInInjectionContext(this.injector, () => this.logoutFn());
    (this.session as WritableSignal<string | null>).set(null);
  }

  searchUser(): void {
    const username = this.searchUsername().trim();
    if (!username) return;
    this.foundUser.set(
      runInInjectionContext(this.injector, () => this.getUserFn(username)) as ResourceRef<User>
    );
  }

  deleteFoundUser(): void {
    const user = this.foundUser()?.value();
    if (!user?.username) return;
    this.deletingUser.set(true);
    const username = user.username ?? '';
    const op = runInInjectionContext(this.injector, () => this.deleteUserFn(username));
    effect(() => {
      const s = op.status();
      if (s === 'resolved' || s === 'error') {
        untracked(() => {
          this.foundUser.set(null);
          this.searchUsername.set('');
          this.deletingUser.set(false);
        });
      }
    }, { injector: this.injector });
  }

  submitCreate(): void {
    const username = this.createUsername().trim();
    if (!username || this.createLoading()) return;
    this.createError.set(null);
    this.createSuccess.set(false);
    this.createLoading.set(true);

    const body: CreateUserBody = {
      username,
      firstName: this.createFirstName().trim() || undefined,
      lastName: this.createLastName().trim() || undefined,
      email: this.createEmail().trim() || undefined,
      password: this.createPassword().trim() || undefined,
      phone: this.createPhone().trim() || undefined,
    };

    const op = runInInjectionContext(this.injector, () => this.createUserFn(body));
    effect(() => {
      const s = op.status();
      if (s === 'resolved') {
        untracked(() => {
          this.createSuccess.set(true);
          this.createUsername.set('');
          this.createFirstName.set('');
          this.createLastName.set('');
          this.createEmail.set('');
          this.createPassword.set('');
          this.createPhone.set('');
          this.createLoading.set(false);
        });
      } else if (s === 'error') {
        untracked(() => {
          this.createError.set('Failed to create user.');
          this.createLoading.set(false);
        });
      }
    }, { injector: this.injector });
  }
}
