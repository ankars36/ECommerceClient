import { Injectable } from '@angular/core';
import { Create_Order } from '../../../contracts/order/create_order';
import { HttpClientService } from '../http-client.service';
import { Observable, firstValueFrom } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  constructor(private httpCLientService: HttpClientService) { }

  async create(order: Create_Order): Promise<void> {
    const observable: Observable<any> = this.httpCLientService.post({
      controller: "orders"
    }, order);

    await firstValueFrom(observable);
  }
}
