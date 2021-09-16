import { Component, OnInit } from '@angular/core';
import { MerchandiseApiService } from 'src/app/shared/service/merchandise-api.service';

@Component({
  selector: 'app-merchandise',
  templateUrl: './merchandise.component.html',
  styleUrls: ['./merchandise.component.css']
})
export class MerchandiseComponent implements OnInit {
  listMerchandise: any[];
  textNameProduct: string;

  constructor(
    private _merchandiseApi: MerchandiseApiService,
  ) {
    this.listMerchandise = [];
    this.textNameProduct = "";
  }

  ngOnInit(): void {
    this.getAllMerchandise();
  }

  getAllMerchandise() {
    console.log("getAllMerchandise");
    this._merchandiseApi.index().subscribe(
      (result) => {
        this.listMerchandise = result;
      },
      (error) => {
        console.log('error: ' + JSON.stringify(error));
      }
    );
  }

  searchByNameProduct() {
    console.log("searchByNameProduct");
    this._merchandiseApi.searchByNameProduct(this.textNameProduct).subscribe(
      (result) => {
        this.listMerchandise = result;
        console.log(this.listMerchandise)
      },
      (error) => {
        console.log('error: ' + JSON.stringify(error));
      }
    );
  }

  search() {
    console.log("probando search");
    console.log(this.textNameProduct);
    if (this.textNameProduct == '') {
      this.getAllMerchandise();
    } else {
      this.searchByNameProduct();
    }
  }

}
