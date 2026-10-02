import { Component, DestroyRef, Injector, computed, effect, inject, runInInjectionContext, signal, untracked } from '@angular/core';
import { HttpEventType } from '@angular/common/http';
import type { Subscription } from 'rxjs';
import {
  FIND_PETS_BY_STATUS,
  ADD_PET,
  DELETE_PET,
  UPLOAD_FILE,
  type FindPetsByStatusParams,
  type AddPetBody,
} from '@angular-openapi-gen/petstore-data-access';
import { MatButtonModule } from '@angular/material/button';
import { MatChipsModule } from '@angular/material/chips';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';
import { describeResourceError, logResourceError } from '../../resource-error.util';

type PetStatus = FindPetsByStatusParams['status'];

function formatBytes(n: number): string {
  if (n < 1024) return `${n} B`;
  if (n < 1024 * 1024) return `${(n / 1024).toFixed(1)} KB`;
  return `${(n / (1024 * 1024)).toFixed(1)} MB`;
}

interface Pet {
  id: number;
  name: string;
  status?: string;
  category?: { id?: number; name?: string };
  tags?: { id?: number; name?: string }[];
  photoUrls?: string[];
}

@Component({
  selector: 'app-pets-page',
  imports: [
    MatButtonModule,
    MatChipsModule,
    MatProgressBarModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatIconModule,
    MatTooltipModule,
  ],
  templateUrl: './pets-page.html',
  styleUrl: './pets-page.less',
})
export class PetsPageComponent {
  readonly describeError = describeResourceError;

  private readonly injector = inject(Injector);
  private readonly findPetsByStatus = inject(FIND_PETS_BY_STATUS);
  private readonly addPetFn = inject(ADD_PET);
  private readonly deletePetFn = inject(DELETE_PET);
  private readonly uploadFileFn = inject(UPLOAD_FILE);

  constructor() {
    inject(DestroyRef).onDestroy(() => this.uploadSub?.unsubscribe());
  }

  // ── List ──────────────────────────────────────────────────────────────────
  readonly statusOptions: PetStatus[] = ['available', 'pending', 'sold'];
  readonly status = signal<PetStatus>('available');
  // Per-call options (`--callOptions`): a defaultValue makes `value()` an array from the start — no
  // `undefined` to guard while loading — and debugName labels the resource in Angular DevTools.
  readonly pets = this.findPetsByStatus(() => ({ status: this.status() }), {
    defaultValue: [],
    debugName: 'pets',
  });
  readonly petList = computed<Pet[]>(() => this.pets.value() as Pet[]);

  private readonly logPetsError = effect(() => {
    const error = this.pets.error();
    if (error) logResourceError('petstore/findByStatus', error);
  });

  // ── Selected ──────────────────────────────────────────────────────────────
  readonly selectedPetId = signal<number | null>(null);
  readonly selectedPet = computed(() => {
    const id = this.selectedPetId();
    return id != null ? (this.petList().find(p => p.id === id) ?? null) : null;
  });

  // ── Add form ──────────────────────────────────────────────────────────────
  readonly showAddForm = signal(false);
  readonly addName = signal('');
  readonly addStatus = signal<PetStatus>('available');
  readonly addTags = signal('');
  readonly addLoading = signal(false);
  readonly addError = signal<string | null>(null);

  // ── Upload photo ──────────────────────────────────────────────────────────
  readonly uploadFile = signal<File | null>(null);
  readonly uploadLoading = signal(false);
  readonly uploadSuccess = signal<string | null>(null);
  readonly uploadError = signal<string | null>(null);
  /**
   * Latest `UploadProgress` event of the current upload. Kept after a failure so the message can
   * say where it stopped. UPLOAD_FILE is generated with `--clientType=httpClient --reportProgress`,
   * so it yields `Observable<HttpEvent<T>>`: progress events, then the response.
   */
  readonly uploadProgress = signal<{ loaded: number; total?: number } | null>(null);
  private uploadSub: Subscription | null = null;
  /** 0–100, or null while the total is unknown (e.g. before the first progress event). */
  readonly uploadPercent = computed(() => {
    const p = this.uploadProgress();
    return p?.total ? Math.min(100, Math.round((p.loaded / p.total) * 100)) : null;
  });
  readonly uploadBytes = computed(() => {
    const p = this.uploadProgress();
    if (!p) return null;
    return p.total ? `${formatBytes(p.loaded)} / ${formatBytes(p.total)}` : formatBytes(p.loaded);
  });

  // ── Delete (optimistic) ───────────────────────────────────────────────────
  readonly deletingIds = signal(new Set<number>());
  readonly visiblePets = computed(() =>
    this.petList().filter(p => !this.deletingIds().has(p.id))
  );

  selectPet(id: number): void {
    this.selectedPetId.update(cur => (cur === id ? null : id));
    this.cancelUpload();
    this.uploadFile.set(null);
    this.uploadSuccess.set(null);
    this.uploadError.set(null);
    this.uploadProgress.set(null);
  }

  onFileSelected(event: Event): void {
    const file = (event.target as HTMLInputElement).files?.[0] ?? null;
    this.uploadFile.set(file);
    this.uploadSuccess.set(null);
    this.uploadError.set(null);
    this.uploadProgress.set(null);
  }

  uploadPhoto(): void {
    const file = this.uploadFile();
    const petId = this.selectedPetId();
    if (!file || petId == null || this.uploadLoading()) return;
    this.uploadError.set(null);
    this.uploadSuccess.set(null);
    this.uploadProgress.set(null);
    this.uploadLoading.set(true);

    // The endpoint takes the raw bytes (Blob | ArrayBuffer); a File is a Blob.
    this.uploadSub = this.uploadFileFn(String(petId), file).subscribe({
      next: (event) => {
        if (event.type === HttpEventType.UploadProgress) {
          this.uploadProgress.set({ loaded: event.loaded, total: event.total });
        } else if (event.type === HttpEventType.Response) {
          this.uploadSuccess.set((event.body as { message?: string } | null)?.message ?? 'Uploaded');
          this.uploadFile.set(null);
          this.uploadProgress.set(null);
          this.uploadLoading.set(false);
          this.pets.reload();
        }
      },
      error: () => {
        const pct = this.uploadPercent();
        this.uploadError.set(pct != null ? `Upload failed at ${pct}%.` : 'Upload failed.');
        this.uploadLoading.set(false);
      },
    });
  }

  /** Unsubscribing aborts the in-flight request. */
  cancelUpload(): void {
    if (!this.uploadSub) return;
    this.uploadSub.unsubscribe();
    this.uploadSub = null;
    if (this.uploadLoading()) {
      this.uploadLoading.set(false);
      this.uploadError.set('Upload cancelled.');
    }
  }

  submitAdd(): void {
    const name = this.addName().trim();
    if (!name || this.addLoading()) return;
    this.addError.set(null);
    this.addLoading.set(true);

    const body: AddPetBody = {
      name,
      status: this.addStatus(),
      photoUrls: [],
      ...(this.addTags().trim()
        ? { tags: this.addTags().split(',').map((t, i) => ({ id: i, name: t.trim() })) }
        : {}),
    };

    const op = runInInjectionContext(this.injector, () => this.addPetFn(body));
    effect(
      () => {
        const s = op.status();
        if (s === 'resolved') {
          untracked(() => {
            this.pets.reload();
            this.addName.set('');
            this.addTags.set('');
            this.showAddForm.set(false);
            this.addLoading.set(false);
          });
        } else if (s === 'error') {
          untracked(() => {
            this.addError.set('Failed to add pet. Try again.');
            this.addLoading.set(false);
          });
        }
      },
      { injector: this.injector },
    );
  }

  deletePet(petId: number): void {
    this.deletingIds.update(s => new Set([...s, petId]));
    if (this.selectedPetId() === petId) this.selectedPetId.set(null);

    const op = runInInjectionContext(this.injector, () => this.deletePetFn(String(petId)));
    effect(
      () => {
        const s = op.status();
        if (s === 'resolved' || s === 'error') {
          untracked(() => {
            this.pets.reload();
            this.deletingIds.update(set => {
              const next = new Set(set);
              next.delete(petId);
              return next;
            });
          });
        }
      },
      { injector: this.injector },
    );
  }

  petEmoji(pet: Pet): string {
    const hint = (pet.category?.name ?? pet.name ?? '').toLowerCase();
    if (hint.includes('dog') || hint.includes('puppy') || hint.includes('hound')) return '🐕';
    if (hint.includes('cat') || hint.includes('kitten') || hint.includes('feline')) return '🐈';
    if (hint.includes('bird') || hint.includes('parrot')) return '🦜';
    if (hint.includes('fish')) return '🐟';
    if (hint.includes('rabbit') || hint.includes('bunny')) return '🐇';
    if (hint.includes('hamster') || hint.includes('mouse')) return '🐹';
    return '🐾';
  }

  tagNames(pet: Pet): string {
    return pet.tags?.map(t => t.name).filter(Boolean).join(', ') ?? '';
  }
}
