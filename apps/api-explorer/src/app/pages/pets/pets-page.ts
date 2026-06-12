import { Component, Injector, computed, effect, inject, runInInjectionContext, signal, untracked } from '@angular/core';
import {
  FIND_PETS_BY_STATUS,
  ADD_PET,
  DELETE_PET,
  UPLOAD_FILE,
  type FindPetsByStatusParams,
  type AddPetBody,
  type UploadFileBody,
} from '@angular-openapi-gen/petstore-data-access';
import { MatButtonModule } from '@angular/material/button';
import { MatChipsModule } from '@angular/material/chips';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';

type PetStatus = FindPetsByStatusParams['status'];

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
  private readonly injector = inject(Injector);
  private readonly findPetsByStatus = inject(FIND_PETS_BY_STATUS);
  private readonly addPetFn = inject(ADD_PET);
  private readonly deletePetFn = inject(DELETE_PET);
  private readonly uploadFileFn = inject(UPLOAD_FILE);

  // ── List ──────────────────────────────────────────────────────────────────
  readonly statusOptions: PetStatus[] = ['available', 'pending', 'sold'];
  readonly status = signal<PetStatus>('available');
  readonly pets = this.findPetsByStatus(() => ({ status: this.status() }));
  readonly petList = computed<Pet[]>(() => (this.pets.value() as Pet[] | undefined) ?? []);

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

  // ── Delete (optimistic) ───────────────────────────────────────────────────
  readonly deletingIds = signal(new Set<number>());
  readonly visiblePets = computed(() =>
    this.petList().filter(p => !this.deletingIds().has(p.id))
  );

  selectPet(id: number): void {
    this.selectedPetId.update(cur => (cur === id ? null : id));
    this.uploadFile.set(null);
    this.uploadSuccess.set(null);
    this.uploadError.set(null);
  }

  onFileSelected(event: Event): void {
    const file = (event.target as HTMLInputElement).files?.[0] ?? null;
    this.uploadFile.set(file);
    this.uploadSuccess.set(null);
    this.uploadError.set(null);
  }

  uploadPhoto(): void {
    const file = this.uploadFile();
    const petId = this.selectedPetId();
    if (!file || petId == null || this.uploadLoading()) return;
    this.uploadError.set(null);
    this.uploadLoading.set(true);

    const fd = new FormData();
    fd.append('file', file);

    const op = runInInjectionContext(this.injector, () =>
      this.uploadFileFn(String(petId), fd as unknown as UploadFileBody),
    );
    effect(
      () => {
        const s = op.status();
        if (s === 'resolved') {
          untracked(() => {
            const msg = (op.value() as { message?: string } | undefined)?.message ?? 'Uploaded';
            this.uploadSuccess.set(msg);
            this.uploadFile.set(null);
            this.uploadLoading.set(false);
            this.pets.reload();
          });
        } else if (s === 'error') {
          untracked(() => {
            this.uploadError.set('Upload failed.');
            this.uploadLoading.set(false);
          });
        }
      },
      { injector: this.injector },
    );
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
