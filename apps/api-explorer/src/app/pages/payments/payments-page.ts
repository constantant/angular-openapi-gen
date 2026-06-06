import { Component, inject } from '@angular/core';
import { JsonPipe } from '@angular/common';
import { GET_INVOICES } from '@angular-openapi-gen/stripe-data-access';

@Component({
  selector: 'app-payments-page',
  imports: [JsonPipe],
  templateUrl: './payments-page.html',
})
export class PaymentsPageComponent {
  private getInvoices = inject(GET_INVOICES);

  readonly invoices = this.getInvoices();
}
