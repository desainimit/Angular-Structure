import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root',
})
export class ToastService {
  constructor(private toast: ToastrService) {}

  showSuccess(message: string): void {
    this.toast.success(message);
  }

  showError(message: string): void {
    this.toast.error(message);
  }

  showWarning(message: string): void {
    this.toast.warning(message);
  }

  showInfo(message: string): void {
    this.toast.info(message);
  }

  showCustom(message: string): void {
    this.toast.show(message);
  }
}
