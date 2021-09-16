import { formatDate } from '@angular/common';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, NgForm, Validators } from '@angular/forms';
import { AlertType } from 'src/app/shared/enums/alert-type.enum';
import { GeneralFormService } from 'src/app/shared/service/general-form.service';
import { MerchandiseApiService } from 'src/app/shared/service/merchandise-api.service';
import { UserApiService } from 'src/app/shared/service/user-api.service';

@Component({
  selector: 'app-merchandise-add',
  templateUrl: './merchandise-add.component.html',
  styleUrls: ['./merchandise-add.component.css'],
})
export class MerchandiseAddComponent implements OnInit {
  actualDate: string;
  listUser: any[];
  merchandiseFormGroup: FormGroup;
  typeAlert: string = AlertType.Primary;
  messageRequest: string;
  @ViewChild('alert', { static: true })
  alert!: ElementRef;
  @ViewChild('myForm')
  private formDirective!: NgForm;

  constructor(
    private _userApi: UserApiService,
    private _merchandiseApi: MerchandiseApiService,
    private _generalForm: GeneralFormService
  ) {
    this.actualDate = formatDate(new Date(), 'yyyy-MM-dd', 'en');
    this.listUser = [];
    this.merchandiseFormGroup = new FormGroup({
      nameProduct: new FormControl('', Validators.required),
      quantity: new FormControl('', Validators.required),
      userId: new FormControl('', Validators.required),
      admissionDate: new FormControl('', Validators.required),
    });
    this.messageRequest = '';
    console.log(this.actualDate);
  }

  ngOnInit(): void {
    this.getAllUser();
  }

  getAllUser() {
    this._userApi.index().subscribe(
      (result) => {
        this.listUser = result;
      },
      (error) => {
        console.log('error: ' + JSON.stringify(error));
      }
    );
  }

  onSave() {
    console.log('SAVE INFO ETL');
    // stop here if form is invalid
    if (this.merchandiseFormGroup.invalid) {
      return;
    }

    // display form values on success
    let result = this.merchandiseFormGroup.value;
    /*let object: any = JSON.parse(JSON.stringify(result));
    console.log("OBJECT")
    console.log(object)*/

    this.saveMerchandise(result);
  }

  saveMerchandise(merchandise: any) {
    this._merchandiseApi.create(merchandise).subscribe(
      (result) => {
        this._generalForm.cleanForm(this.merchandiseFormGroup, this.formDirective);
        if (result.nameProduct != null) {
          this.typeAlert = AlertType.Success;
          this.messageRequest = "Mercancía registrada satisfactoriamente!";
        } else {
          this.typeAlert = AlertType.Error;
          this.messageRequest = "Error al registrar la mercancía!"
        }
        this._generalForm.showAlert(this.alert, this.typeAlert);

        setTimeout(() => {
          this._generalForm.closeAlert(this.alert, this.typeAlert);
        }, this._generalForm.timer);
      },
      (error) => {
        console.log('error: ' + JSON.stringify(error));
      }
    );
  }

  closeAlert() {
    this._generalForm.closeAlert(this.alert, this.typeAlert);
  }

  get merchandiseAdd() {
    return this.merchandiseFormGroup.controls;
  }
}
