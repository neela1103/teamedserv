import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserAuthModel } from '../common/models/UserAuthModel';
import { Router } from '@angular/router';
import { AuthService } from '../shared/services/auth.service';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss'],
})
export class AuthComponent implements OnInit {
  loginForm!: FormGroup;
  hide = true;
  constructor(
    private fb: FormBuilder,
    private router: Router,
    private _authService: AuthService
  ) {}

  ngOnInit() {
    this.loginForm = this.fb.group({
      email: ['', Validators.required],
      password: ['', Validators.required],
    });
  }
  login() {
    if (this.loginForm.valid) {
      const formModel: UserAuthModel = this.loginForm.value as UserAuthModel;
      // Logic to handle login
      console.log(this._authService.login(formModel))
      if (this._authService.login(formModel))
        this.router.navigate(['/']);
    }
  }
}
