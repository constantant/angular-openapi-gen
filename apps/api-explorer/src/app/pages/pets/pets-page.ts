import { Component, inject, signal } from '@angular/core';
import { FIND_PETS_BY_STATUS } from '@angular-openapi-gen/petstore-data-access';

type PetStatus = 'available' | 'pending' | 'sold';

@Component({
  selector: 'app-pets-page',
  imports: [],
  templateUrl: './pets-page.html',
})
export class PetsPageComponent {
  private findPetsByStatus = inject(FIND_PETS_BY_STATUS);

  readonly statusOptions: PetStatus[] = ['available', 'pending', 'sold'];
  readonly status = signal<PetStatus>('available');

  readonly petsByStatus = this.findPetsByStatus(() => ({ status: this.status() }));
}
