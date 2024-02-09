import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardModule } from './dashboard/dashboard.module';
import { ProductsModule } from './products/products.module';
import { CustomersModule } from './customers/customers.module';
import { OrdersModule } from './orders/orders.module';
import { AuthorizeMenuComponent } from './authorize-menu/authorize-menu.component';
import { AuthorizeMenuModule } from './authorize-menu/authorize-menu.module';
import { RoleModule } from './role/role.module';

@NgModule({
  declarations: [
    
  ],
  imports: [
    CommonModule,
    DashboardModule,
    ProductsModule,
    CustomersModule,
    OrdersModule,
    AuthorizeMenuModule,
    RoleModule
  ]
})
export class ComponentsModule { }
