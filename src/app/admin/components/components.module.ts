import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardModule } from './dashboard/dashboard.module';
import { ProductsModule } from './products/products.module';
import { CustomersModule } from './customers/customers.module';
import { OrdersModule } from './orders/orders.module';



@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    DashboardModule,
    ProductsModule,
    CustomersModule,
    OrdersModule
  ]
})
export class ComponentsModule { }
