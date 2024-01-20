import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { APIConstant } from 'src/app/common/constants/APIConstant';
import { ApiService } from 'src/app/shared/services/api/api.service';
import { AuthService } from 'src/app/shared/services/auth.service';

@Component({
  selector: 'app-add-medical',
  templateUrl: './add-medical.component.html',
  styleUrls: ['./add-medical.component.scss'],
})
export class AddMedicalComponent implements OnInit {
  public showSpinner: Boolean = false;
  public medicalData: any;
  public isUnameAvailable: Boolean = true;
  public isChecking: Boolean = false;
  public fieldData: any;

  medicalForm = this.fb.group({
    customer_id: 0,
    first_name: ['', Validators.required],
    last_name: ['', Validators.required],
    describe: ['', Validators.required],
    email: [
      '',
      [
        Validators.required,
        Validators.email,
        this.usernameAvailabilityValidator.bind(this),
      ],
    ],
    profession: ['', Validators.required],
    ethnicity: ['', Validators.required],
    languages: ['', Validators.required],
    county: ['', Validators.required],
    service_area: ['', Validators.required],
    phone: ['', Validators.required],
    address: ['', Validators.required],
    internal_notes: '',
  });

  constructor(
    private fb: FormBuilder,
    private _apiService: ApiService,
    private router: Router,
    private _authService: AuthService
  ) {}
  ngOnInit(): void {
    this.medicalData = history.state.medicalData;
    this.medicalForm.patchValue({
      customer_id: this.medicalData.customer_id,
      first_name: this.medicalData.first_name,
      last_name: this.medicalData.last_name,
      describe: this.medicalData.describe,
      email: this.medicalData.email,
      profession: this.medicalData.profession,
      ethnicity: this.medicalData.ethnicity,
      languages: this.medicalData.languages,
      county: this.medicalData.county,
      service_area: this.medicalData.service_area,
      phone: this.medicalData.phone,
      address: this.medicalData.address,
      internal_notes: this.medicalData.internal_notes,
    });
    this.getFieldData();
  }
  onSubmit() {}

  public getFieldData() {
    this.showSpinner = true;
    this._apiService.get(APIConstant.GET_MEDICAL_FIELD_DATA).subscribe(
      (res: any) => {
        if (res) {
          console.log(res);
          this.fieldData = res;
        }
        this.showSpinner = false;
      },
      (error) => {
        console.log(error);
        this.showSpinner = false;
      }
    );
  }
  public usernameAvailabilityValidator(control: any) {
    if (this.isUnameAvailable === false) {
      return { notAvailable: true };
    }
    return null;
  }
  public handleCancel() {
    this.router.navigate(['medical-team']);
  }
  public async checkUsernameAvailable(event: Event) {
    if (!this.medicalForm.get('email')?.hasError('email')) {
      const inputElement = event.target as HTMLInputElement;
      let username = inputElement.value;
      try {
        this.isChecking = true;
        console.log(this.isChecking);
        const isAvailable: boolean =
          await this._authService.checkUsernameAvailable(username);
        this.isUnameAvailable = isAvailable;
        this.medicalForm.get('email')?.updateValueAndValidity();
      } catch (err) {
        console.log(err);
      } finally {
        this.isChecking = false;
        console.log(this.isChecking);
      }
    }
  }
}
