import { Component, signal } from '@angular/core';
import { ILogin } from '../../core/models/interfaces/dtos/ILogin.dto';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../core/services/auth.service';
import { Router } from '@angular/router';
import { ToastService } from '../../core/services/toast.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export class LoginComponent {
  loginForm!: FormGroup;
  isSubmitted: boolean = false;
  isLoading: boolean = false;
  hide = signal(true);

  constructor(
    private authService: AuthService,
    private router: Router,
    private toastService: ToastService
  ) {}

  ngOnInit(): void {
    this.initialForm();
  }

  initialForm(): void {
    this.loginForm = new FormGroup({
      username: new FormControl('', [
        Validators.required,
        Validators.minLength(2),
      ]),
      password: new FormControl('', [
        Validators.required,
        Validators.minLength(6),
      ]),
    });
  }

  submitLoginForm(): void {
    this.isSubmitted = true;
    this.isLoading = true;

    if (this.loginForm.valid) {
      this.authService.login(this.loginForm.value as ILogin).subscribe({
        next: (res: any) => {
          if (res.status) {
            this.isLoading = false;
            this.toastService.showSuccess(res.message);
          }
        },
        error: () => {
          this.isLoading = false;
          this.isSubmitted = false;
        },
        complete: () => {
          this.router.navigate(['/']);
        },
      });
    } else {
      this.isLoading = false;
    }
  }

  toggleHide(event: MouseEvent) {
    this.hide.set(!this.hide());
    event.stopPropagation();
  }
}
