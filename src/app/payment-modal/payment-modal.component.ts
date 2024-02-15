import {
  Component,
  Inject,
  OnInit,
  ViewChild,
  inject,
  signal,
} from '@angular/core';
import { FormBuilder, UntypedFormBuilder, Validators } from '@angular/forms';
import {
  StripeElementsOptions,
  StripePaymentElementOptions,
} from '@stripe/stripe-js';
import { StripePaymentElementComponent, injectStripe } from 'ngx-stripe';
import { environment } from 'src/environments/environment';
import { StripeService } from '../shared/services/stripe/stripe.service';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-payment-modal',
  templateUrl: './payment-modal.component.html',
  styleUrls: ['./payment-modal.component.scss'],
})
export class PaymentModalComponent implements OnInit {
  @ViewChild(StripePaymentElementComponent)
  paymentElement!: StripePaymentElementComponent;

  paymentElementForm = this.fb.group({
    name: ['John doe', [Validators.required]],
    email: ['support@ngx-stripe.dev', [Validators.required]],
    address: [''],
    zipcode: [''],
    city: [''],
    amount: [2500, [Validators.required, Validators.pattern(/d+/)]],
  });

  elementsOptions: StripeElementsOptions = {
    locale: 'en',
    appearance: {
      theme: 'flat',
    },
  };

  paymentElementOptions: StripePaymentElementOptions = {
    layout: {
      type: 'tabs',
      defaultCollapsed: false,
      radios: false,
      spacedAccordionItems: false,
    },
  };

  // Replace with your own public key
  stripe = injectStripe(environment.publishableKey);
  paying = signal(false);

  constructor(
    private _stripeService: StripeService,
    private fb: FormBuilder,
    public dialogRef: MatDialogRef<PaymentModalComponent>
  ) {}
  ngOnInit() {
    this._stripeService
      .createPaymentIntent({
        amount: 613,
        currency: 'usd',
      })
      .subscribe((pi) => {
        this.elementsOptions.clientSecret = pi.client_secret as string;
      });
  }

  pay() {
    if (this.paying()) return;
    this.paying.set(true);

    const [name, email, address, zipcode, city] = [
      'Deepak',
      'manedeep2001@gmail.com',
      'Thane',
      '400604',
      'Thane',
    ];

    this.stripe
      .confirmPayment({
        elements: this.paymentElement.elements,
        confirmParams: {
          payment_method_data: {
            billing_details: {
              name: name as string,
              email: email as string,
              address: {
                line1: address as string,
                postal_code: zipcode as string,
                city: city as string,
              },
            },
          },
        },
        redirect: 'if_required',
      })
      .subscribe((result) => {
        this.paying.set(false);
        console.log('Result', result);
        if (result.error) {
          // Show error to your customer (e.g., insufficient funds)
          alert({ success: false, error: result.error.message });
        } else {
          // The payment has been processed!
          if (result.paymentIntent.status === 'succeeded') {
            // Show a success message to your customer
            alert({ success: true });
          }
        }
      });
  }

  public onNoClick() {
    this.dialogRef.close();
  }
}
