import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { CustomSnackbarComponent } from './notification.component';


@Injectable({
  providedIn:'root'
})
export class NotificationService {

  constructor(private snackBar: MatSnackBar) { }

  showCustom(message: string, action: string = 'Close', duration: number = 3000,
    panelClass: string[] = [],horizontalPosition: 'start' | 'center' | 'end' | 'left' | 'right' = 'right', 
    verticalPosition: 'top' | 'bottom' = 'bottom') {
    this.snackBar.openFromComponent(CustomSnackbarComponent, {
      duration,
      data: { message, action },
      horizontalPosition,
      verticalPosition,
      panelClass: ['custom-snackbar', ...panelClass]
    });
  }

  showSuccess(message: string, action: string = 'Close', duration: number = 3000,
    horizontalPosition: 'start' | 'center' | 'end' | 'left' | 'right' = 'right', 
    verticalPosition: 'top' | 'bottom' = 'bottom') {
    this.showCustom(message, action, duration, ['custom-snackbar-success'],horizontalPosition, verticalPosition);
  }

  showError(message: string, action: string = 'Close', duration: number = 3000,
    horizontalPosition: 'start' | 'center' | 'end' | 'left' | 'right' = 'right', 
    verticalPosition: 'top' | 'bottom' = 'bottom') {
    this.showCustom(message, action, duration, ['custom-snackbar-error'],horizontalPosition, verticalPosition);
  }

  showWarning(message: string, action: string = 'Close', duration: number = 3000,
    horizontalPosition: 'start' | 'center' | 'end' | 'left' | 'right' = 'right', 
    verticalPosition: 'top' | 'bottom' = 'bottom') {
    this.showCustom(message, action, duration, ['custom-snackbar-warning'],horizontalPosition, verticalPosition);
  }

  showInfo(message: string, action: string = 'Close', duration: number = 3000,
    horizontalPosition: 'start' | 'center' | 'end' | 'left' | 'right' = 'right', 
    verticalPosition: 'top' | 'bottom' = 'bottom' ) {
    this.showCustom(message, action, duration, ['custom-snackbar-info'],horizontalPosition, verticalPosition);
  }
}