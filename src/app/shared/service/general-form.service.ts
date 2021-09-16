import { ElementRef, Injectable } from '@angular/core';
import { FormGroup, NgForm } from '@angular/forms';

const labelShowAlert = 'show';
export const TIMER_OUT: number = 5000;
export const TIMER_OUT_SHORT: number = 2000;

@Injectable({
  providedIn: 'root',
})
export class GeneralFormService {
  constructor() {}

  showAlert(element: ElementRef, nameClass: string) {
    element.nativeElement.classList.add(labelShowAlert);
    element.nativeElement.classList.add(nameClass);
  }

  closeAlert(element: ElementRef, nameClass: string) {
    element.nativeElement.classList.remove(labelShowAlert);
    element.nativeElement.classList.remove(nameClass);
  }

  cleanForm(formGroup: FormGroup, ngForm: NgForm) {
    formGroup.reset();
    ngForm.resetForm();
    formGroup.invalid;
  }

  get timer() {
    return TIMER_OUT;
  }

  get timerShort() {
    return TIMER_OUT_SHORT;
  }
}
