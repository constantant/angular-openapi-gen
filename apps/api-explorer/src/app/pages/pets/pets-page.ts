import { Component, inject, signal, ChangeDetectionStrategy } from '@angular/core';
import { FIND_PETS_BY_STATUS, FindPetsByStatusParams } from '@angular-openapi-gen/petstore-data-access';
import { MatChipsModule } from '@angular/material/chips';
import { MatListModule } from '@angular/material/list';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatBadgeModule } from '@angular/material/badge';

type PetStatus = FindPetsByStatusParams['status'];

@Component({
  selector: 'app-pets-page',
  imports: [MatChipsModule, MatListModule, MatProgressBarModule, MatBadgeModule],
  changeDetection: ChangeDetectionStrategy.Eager,
  templateUrl: './pets-page.html',
})
export class PetsPageComponent {
  private findPetsByStatus = inject(FIND_PETS_BY_STATUS);

  readonly statusOptions: PetStatus[] = ['available', 'pending', 'sold'];
  readonly status = signal<PetStatus>('available');

  readonly petsByStatus = this.findPetsByStatus(() => ({ status: this.status() }));
}
