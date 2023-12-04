import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MatCheckboxChange } from '@angular/material/checkbox';
import { MatRadioChange } from '@angular/material/radio';
import { APIConstant } from 'src/app/common/constants/APIConstant';
import { CustomerModel } from 'src/app/common/models/CustomerModel';
import { ApiService } from 'src/app/shared/services/api/api.service';

@Component({
  selector: 'app-add-customer',
  templateUrl: './add-customer.component.html',
  styleUrls: ['./add-customer.component.scss'],
})
export class AddCustomerComponent {
  companyForm = this.fb.group({
    username: ['', [Validators.required, Validators.email]],
    password: ['', Validators.required],
    company_name: ['', Validators.required],
    federal_no: [
      '',
      [
        Validators.required,
        // Validators.pattern('[0-9]*'),
        Validators.maxLength(10),
      ],
    ],
    physical_address: ['', Validators.required],
    mailing_address: ['', Validators.required],
    company_email: ['', [Validators.required, Validators.email]],
    phone: [
      '',
      [
        Validators.required,
        Validators.pattern('^\\([0-9]{3}\\) [0-9]{3}-[0-9]{4}$'), // Valid pattern: (XXX) XXX-XXXX
      ],
    ],
    fax: [
      '',
      [
        Validators.required,
        Validators.pattern('^\\([0-9]{3}\\) [0-9]{3}-[0-9]{4}$'), // Valid pattern: (XXX) XXX-XXXX
      ],
    ],
    website: '',
    timezone: ['', Validators.required],
    contact_name: ['', Validators.required],
    position: '',
    contact_phone: [
      '',
      [
        Validators.required,
        Validators.pattern('^\\([0-9]{3}\\) [0-9]{3}-[0-9]{4}$'), // Valid pattern: (XXX) XXX-XXXX
      ],
    ],
    contact_email: ['', [Validators.required, Validators.email]],
    credit_limit: '',
    payment_method: '',
    payment_days: '',
    payment_terms: '',
    notes: '',
    company_id: ['', Validators.required],
    status: [true, Validators.required],
  });

  constructor(private fb: FormBuilder, private _apiService: ApiService) {}

  onSubmit(): void {
    if (this.companyForm.valid) {
      const formModel: CustomerModel = this.companyForm.value as CustomerModel;
      const formData = new FormData();

      // Convert JSON object to FormData
      for (const key of Object.keys(formModel)) {
        const value = formModel[key];
        formData.append(key, value);
      }
      this._apiService
        .post(APIConstant.ADD_CUSTOMER, formData)
        .subscribe((res) => {
          if (res) {
            console.log(res);
          }
        });

      // console.log(formModel);
    }
    return;
  }

  public handleFederalNo(event: Event) {
    const inputElement = event.target as HTMLInputElement;
    let enteredValue = inputElement.value;

    enteredValue = enteredValue.replace(/\D/g, '');

    if (enteredValue.length > 3) {
      enteredValue = enteredValue.slice(0, 3) + '-' + enteredValue.slice(3);
    }

    enteredValue = enteredValue.slice(0, 10);

    this.companyForm.patchValue(
      { federal_no: enteredValue },
      { emitEvent: false }
    );
    this.companyForm.get('federal_no')?.markAsTouched(); // Mark federal_no as touched

    if (enteredValue.length < 10) {
      this.companyForm.get('federal_no')?.setErrors({ maxlength: true });
    } else {
      this.companyForm.get('federal_no')?.setErrors(null); // Clear the 'maxlength' error
    }
  }

  handleMobileNumber(event: Event, field: string) {
    const inputElement = event.target as HTMLInputElement;
    let enteredValue = inputElement.value;

    enteredValue = enteredValue.replace(/\D/g, ''); // Allow only numbers
    enteredValue = enteredValue.slice(0, 10); // Limit to 10 characters

    // Format the phone number as (XXX) XXX-XXXX
    if (enteredValue.length > 3) {
      enteredValue = `(${enteredValue.slice(0, 3)}) ${enteredValue.slice(3)}`;
    }
    if (enteredValue.length > 9) {
      enteredValue = `${enteredValue.slice(0, 9)}-${enteredValue.slice(9)}`;
    }

    // Update form control value and validate
    if (field === 'phone')
      this.companyForm.patchValue(
        { phone: enteredValue },
        { emitEvent: false }
      );
    else if (field === 'fax')
      this.companyForm.patchValue({ fax: enteredValue }, { emitEvent: false });
    else if (field === 'contact_phone')
      this.companyForm.patchValue(
        { contact_phone: enteredValue },
        { emitEvent: false }
      );

    this.companyForm.get(field)?.markAsTouched(); // Mark phone as touched
  }

  public handlePasswordCreation(event: MatRadioChange) {
    if (event.value == 1) {
      this.companyForm.patchValue({ password: '' });
    } else {
      this.companyForm.patchValue({ password: this.generateRandomPassword() });
    }
  }

  public generateRandomPassword() {
    const charset =
      'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$&';

    let password = '';
    for (let i = 0; i < 8; i++) {
      const randomIndex = Math.floor(Math.random() * charset.length);
      password += charset[randomIndex];
    }
    return password;
  }

  public handleMailingAddress(event: MatCheckboxChange) {
    if (event.checked) {
      this.companyForm.patchValue({
        mailing_address: this.companyForm.get('physical_address')?.value,
      });
    } else {
      this.companyForm.patchValue({ mailing_address: '' });
    }
  }
}
