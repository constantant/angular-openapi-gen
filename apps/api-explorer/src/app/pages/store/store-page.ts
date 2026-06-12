import { Component, Injector, computed, effect, inject, runInInjectionContext, signal, untracked } from '@angular/core';
import {
  GET_INVENTORY,
  PLACE_ORDER,
  GET_ORDER_BY_ID,
  DELETE_ORDER,
  type GetOrderByIdResponse,
  type PlaceOrderBody,
} from '@angular-openapi-gen/petstore-data-access';
import { DatePipe } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatDividerModule } from '@angular/material/divider';
import { MatTooltipModule } from '@angular/material/tooltip';

type Order = GetOrderByIdResponse;
interface ResourceRef<T> {
  isLoading: () => boolean;
  error: () => unknown;
  value: () => T | undefined;
  status: () => string;
}

@Component({
  selector: 'app-store-page',
  imports: [
    DatePipe,
    MatButtonModule,
    MatProgressBarModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    MatDividerModule,
    MatTooltipModule,
  ],
  templateUrl: './store-page.html',
  styleUrl: './store-page.less',
})
export class StorePageComponent {
  private readonly injector = inject(Injector);
  private readonly getInventoryFn = inject(GET_INVENTORY);
  private readonly placeOrderFn = inject(PLACE_ORDER);
  private readonly getOrderByIdFn = inject(GET_ORDER_BY_ID);
  private readonly deleteOrderFn = inject(DELETE_ORDER);

  // ── Inventory ─────────────────────────────────────────────────────────────
  readonly inventory = this.getInventoryFn();
  readonly inventoryEntries = computed(() => {
    const inv = this.inventory.value() as Record<string, number> | undefined;
    if (!inv) return [];
    return Object.entries(inv)
      .map(([status, count]) => ({ status, count }))
      .sort((a, b) => b.count - a.count);
  });

  // ── Place order ───────────────────────────────────────────────────────────
  readonly orderPetId = signal('');
  readonly orderQty = signal('1');
  readonly orderLoading = signal(false);
  readonly orderSuccess = signal<number | null>(null);
  readonly orderError = signal<string | null>(null);

  // ── Find order ────────────────────────────────────────────────────────────
  readonly findId = signal('');
  readonly foundOrder = signal<ResourceRef<Order> | null>(null);
  readonly deletingOrder = signal(false);

  submitOrder(): void {
    const petId = Number(this.orderPetId());
    if (!petId || this.orderLoading()) return;
    this.orderError.set(null);
    this.orderSuccess.set(null);
    this.orderLoading.set(true);

    const body: PlaceOrderBody = {
      petId,
      quantity: Number(this.orderQty()) || 1,
      status: 'placed',
    };
    const op = runInInjectionContext(this.injector, () => this.placeOrderFn(body));
    effect(() => {
      const s = op.status();
      if (s === 'resolved') {
        untracked(() => {
          const v = op.value() as Order | undefined;
          this.orderSuccess.set(v?.id ?? null);
          this.orderPetId.set('');
          this.orderLoading.set(false);
        });
      } else if (s === 'error') {
        untracked(() => {
          this.orderError.set('Failed to place order.');
          this.orderLoading.set(false);
        });
      }
    }, { injector: this.injector });
  }

  searchOrder(): void {
    const id = this.findId().trim();
    if (!id) return;
    this.foundOrder.set(
      runInInjectionContext(this.injector, () => this.getOrderByIdFn(id)) as ResourceRef<Order>
    );
  }

  deleteFoundOrder(): void {
    const order = this.foundOrder()?.value();
    if (!order?.id) return;
    this.deletingOrder.set(true);
    const op = runInInjectionContext(this.injector, () => this.deleteOrderFn(String(order.id)));
    effect(() => {
      const s = op.status();
      if (s === 'resolved' || s === 'error') {
        untracked(() => {
          this.foundOrder.set(null);
          this.findId.set('');
          this.deletingOrder.set(false);
        });
      }
    }, { injector: this.injector });
  }

  inventoryIcon(status: string): string {
    if (status === 'available') return '✅';
    if (status === 'pending') return '⏳';
    if (status === 'sold') return '🏷️';
    return '📦';
  }
}
