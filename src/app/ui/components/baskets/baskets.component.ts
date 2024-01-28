import { Component, OnInit } from '@angular/core';
import { BaseComponent, SpinnerType } from '../../../base/base.component';
import { NgxSpinnerService } from 'ngx-spinner';
import { BasketService } from '../../../services/common/models/basket.service';
import { ToastrCustomService, ToastrMessageType, ToastrPosition } from '../../../services/ui/toastr-custom.service';
import { Router } from '@angular/router';
import { DialogService } from '../../../services/common/dialog.service';
import { List_Basket_Item } from '../../../contracts/basket/list_basket_item';
import { Update_Basket_Item } from '../../../contracts/basket/update_basket_item';
import { Create_Order } from '../../../contracts/order/create_order';
import { OrderService } from '../../../services/common/models/order.service';

declare var $: any;

@Component({
  selector: 'app-baskets',
  templateUrl: './baskets.component.html',
  styleUrl: './baskets.component.scss'
})
export class BasketsComponent extends BaseComponent implements OnInit {
  constructor(spinner: NgxSpinnerService, private basketService: BasketService, private orderService: OrderService,
    private toastrService: ToastrCustomService, private router: Router, private dialogService: DialogService) {
    super(spinner)
  }

  basketItems: List_Basket_Item[];

  async ngOnInit(): Promise<void> {
    this.showSpinner(SpinnerType.BallAtom)
    this.basketItems = await this.basketService.get()
    this.hideSpinner(SpinnerType.BallAtom)
  }

  async changeQuantity(object: any) {
    this.showSpinner(SpinnerType.BallAtom)
    const basketItemId: string = object.target.attributes["id"].value;
    const quantity: number = object.target.value;
    const basketItem: Update_Basket_Item = new Update_Basket_Item();
    basketItem.basketItemId = basketItemId;
    basketItem.quantity = quantity;
    await this.basketService.updateQuantity(basketItem);
    this.hideSpinner(SpinnerType.BallAtom)
  }

  async removeBasketItem(basketItemId: string) {
    this.showSpinner(SpinnerType.BallAtom);
    await this.basketService.remove(basketItemId);
    $("." + basketItemId).fadeOut(500, () => this.hideSpinner(SpinnerType.BallAtom));
  }

  async shoppingComplete() {
    this.showSpinner(SpinnerType.BallAtom);
    const order: Create_Order = new Create_Order();
    order.address = "Yenimahalle";
    order.description = "Falanca filanca...";
    await this.orderService.create(order);
    this.hideSpinner(SpinnerType.BallAtom);
    this.toastrService.message("Order has been received!", "Order Created!", {
      messageType: ToastrMessageType.Info,
      position: ToastrPosition.TopRight
    })
    this.router.navigate(["/"]);
  }

}
