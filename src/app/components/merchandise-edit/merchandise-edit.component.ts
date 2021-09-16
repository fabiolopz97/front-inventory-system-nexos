import { formatDate } from '@angular/common';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { AlertType } from 'src/app/shared/enums/alert-type.enum';
import { GeneralFormService } from 'src/app/shared/service/general-form.service';
import { MerchandiseApiService } from 'src/app/shared/service/merchandise-api.service';
import { UserApiService } from 'src/app/shared/service/user-api.service';

@Component({
  selector: 'app-merchandise-edit',
  templateUrl: './merchandise-edit.component.html',
  styleUrls: ['./merchandise-edit.component.css'],
})
export class MerchandiseEditComponent implements OnInit {
  currentMerchandise: any;
  loading: boolean;
  actualDate: string;
  idRoute: any;
  messageRequest: String;
  typeAlert: string = AlertType.Primary;
  listUser: any[];
  @ViewChild('alert', { static: true })
  alert!: ElementRef;
  @ViewChild('myForm')
  private formDirective!: NgForm;

  constructor(
    private _userApi: UserApiService,
    private _merchandiseApi: MerchandiseApiService,
    private _route: ActivatedRoute,
    private _generalForm: GeneralFormService
  ) {
    this.loading = true;
    this.idRoute = '';
    this.listUser = [];
    this.messageRequest = '';
    this.actualDate = formatDate(new Date(), 'yyyy-MM-dd', 'en');
  }

  ngOnInit(): void {
    this.getAllUser();
    this._route.params.subscribe((value) => {
      this.idRoute = value['id'];
      console.log(typeof this.idRoute);

      if (typeof Number(this.idRoute) === 'number') {
        this.getMerchandise(this.idRoute);
      }
    });
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

  editMerchandise(form: any) {
    console.log('TEST editMerchandise');
    this._merchandiseApi
      .update(this.idRoute, this.currentMerchandise)
      .subscribe(
        (result) => {
          console.log(result);
          this.loading = false;
          this.typeAlert =
            result.error != true ? AlertType.Success : AlertType.Error;
          this.messageRequest = result.message;
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

  getMerchandise(id: number) {
    this._merchandiseApi.showById(id).subscribe(
      (result) => {
        //console.log(result)
        this.loading = false;
        this.currentMerchandise = result;
      },
      (error) => {
        console.log('error: ' + JSON.stringify(error));
      }
    );
  }

  closeAlert() {
    this._generalForm.closeAlert(this.alert, this.typeAlert);
  }
}
