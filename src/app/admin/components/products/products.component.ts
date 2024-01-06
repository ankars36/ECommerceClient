import { Component, OnInit } from '@angular/core';
import { BaseComponent, SpinnerType } from '../../../base/base.component';
import { NgxSpinnerService } from 'ngx-spinner';
import { HttpClientService } from '../../../services/common/http-client.service';
import { Product } from '../../../contracts/product';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrl: './products.component.scss'
})
export class ProductsComponent extends BaseComponent implements OnInit {
  constructor(spinner: NgxSpinnerService, private htppClientService: HttpClientService) {
    super(spinner);
  }

  ngOnInit(): void {
    this.showSpinner(SpinnerType.BallAtom);

    this.htppClientService.get<Product[]>({
      controller: "Products"
    }).subscribe(data => console.log(data));

    // this.htppClientService.post({
    //   controller: "Products"
    // }, {
    //   name: "Kalem",
    //   stock: 100,
    //   price: 15
    // }).subscribe();

    // this.htppClientService.post({
    //   controller: "Products"
    // }, {
    //   name: "Kagit",
    //   stock: 1000,
    //   price: 1
    // }).subscribe();

    // this.htppClientService.post({
    //   controller: "Products"
    // }, {
    //   name: "Silgi",
    //   stock: 200,
    //   price: 2.5
    // }).subscribe();

    // this.htppClientService.post({
    //   controller: "Products"
    // }, {
    //   name: "Defter",
    //   stock: 100,
    //   price: 12
    // }).subscribe();

    // this.htppClientService.put({
    //   controller: "Products"
    // }, {
    //   id: "aa32f3eb-9757-491e-85a9-0f3e355de79f",
    //   name: "Renkli Kagit",
    //   stock: 1500,
    //   price: 2
    // }).subscribe();
  }
}
