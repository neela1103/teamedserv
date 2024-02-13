import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MatCheckboxChange } from '@angular/material/checkbox';
import { MatRadioChange } from '@angular/material/radio';
import { Router } from '@angular/router';
import { APIConstant } from 'src/app/common/constants/APIConstant';
import { UserTypeConstant } from 'src/app/common/constants/UserTypeConstant';
import { PatientModel } from 'src/app/common/models/PatientModel';
import { ApiService } from 'src/app/shared/services/api/api.service';
import { AuthService } from 'src/app/shared/services/auth.service';
import { GoogleService } from 'src/app/shared/services/google/google.service';

@Component({
  selector: 'app-add-patient',
  templateUrl: './add-patient.component.html',
  styleUrls: ['./add-patient.component.scss'],
})
export class AddPatientComponent implements OnInit{
  public showSpinner: Boolean = false;
  public isUnameAvailable: Boolean = true;
  public isChecking: Boolean = false;
  public timezones: any;
  public addressPredictions: any;
  public patientData!: PatientModel;

  companyForm = this.fb.group({
    customer_id: 0,
    username: [
      '',
      [
        Validators.required,
        Validators.email,
        this.usernameAvailabilityValidator.bind(this),
      ],
    ],
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
    user_type: UserTypeConstant.CUSTOMER,
  });

  constructor(
    private fb: FormBuilder,
    private _apiService: ApiService,
    private router: Router,
    private _authService: AuthService,
    private _googleService: GoogleService
  ) {}

  ngOnInit(): void {
    this.getTimeZones();
    this.patientData = history.state.patientData;
    this.companyForm.patchValue({
      customer_id: this.patientData.customer_id,
      username: this.patientData.username,
      password: this.patientData.password,
      company_name: this.patientData.company_name,
      physical_address: this.patientData.physical_address,
      mailing_address: this.patientData.mailing_address,
      fax: this.patientData.fax,
      timezone: this.patientData.timezone,
      federal_no: this.patientData.federal_no,
      company_email: this.patientData.company_email,
      phone: this.patientData.phone,
      contact_name: this.patientData.contact_name,
      position: this.patientData.position,
      contact_phone: this.patientData.contact_phone,
      contact_email: this.patientData.contact_email,
      credit_limit: this.patientData.credit_limit,
      payment_method: this.patientData.payment_method,
      payment_days: this.patientData.payment_days,
      payment_terms: this.patientData.payment_terms,
      notes: this.patientData.notes,
    });
  }

  onSubmit(): void {
    if (this.companyForm.valid) {
      const formModel: PatientModel = this.companyForm.value as PatientModel;
      const formData = new FormData();

      // Convert JSON object to FormData
      for (const key of Object.keys(formModel)) {
        const value = formModel[key];
        formData.append(key, value);
      }
      this.showSpinner = true;
      this._apiService
        .post(
          this.patientData
            ? APIConstant.EDIT_CUSTOMER
            : APIConstant.ADD_CUSTOMER,
          formData
        )
        .subscribe(
          (res: any) => {
            if (res && res.status) {
              this.showSpinner = false;
              this.router.navigate(['/customer']);
            } else {
              this.showSpinner = false;
              console.log(res.message);
            }
          },
          (error) => {
            this.showSpinner = false;
            console.error('Operation failed', error);
          }
        );
    }
    return;
  }

  public usernameAvailabilityValidator(control: any) {
    if (this.isUnameAvailable === false) {
      return { notAvailable: true };
    }
    return null;
  }

  public async checkUsernameAvailable(event: Event) {
    if (!this.companyForm.get('username')?.hasError('email')) {
      const inputElement = event.target as HTMLInputElement;
      let username = inputElement.value;
      try {
        this.isChecking = true;
        console.log(this.isChecking);
        const isAvailable: boolean =
          await this._authService.checkUsernameAvailable(username);
        this.isUnameAvailable = isAvailable;
        this.companyForm.get('username')?.updateValueAndValidity();
      } catch (err) {
        console.log(err);
      } finally {
        this.isChecking = false;
        console.log(this.isChecking);
      }
    }
  }

  public getAddressPredictions(event: Event) {
    return;
    if (event) {
      const inputElement = event.target as HTMLInputElement;
      let company = inputElement.value;
      this._googleService
        .getAddressPredictions(company)
        .subscribe((predictions: any) => {
          this.addressPredictions = predictions?.predictions || [];
          console.log(this.addressPredictions);
        });
    }
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

  public getTimeZones() {
    this.showSpinner = true;
    this._apiService.get(APIConstant.GET_TIMEZONE).subscribe(
      (res: any) => {
        if (res && res.status) {
          this.showSpinner = false;
          this.timezones = res.data;
        } else {
          console.error('Timexone fetch failed');
        }
      },
      (error) => {
        this.showSpinner = false;
        console.error('Timexone fetch failed', error);
      }
    );
  }
  public handleCancel() {
    this.router.navigate(['customer'], {
      state: { patientData: this.patientData },
    });
  }
  public navigateBack() {
    this.router.navigate(['/customer']);
  }
}
