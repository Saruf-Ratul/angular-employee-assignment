import { ErrorHandler } from '@angular/core';

export class GlobalErrorHandler extends ErrorHandler {
  handleError(error: any) {
    // alert('Global Error handler called');
    console.log(error);
  }
}
