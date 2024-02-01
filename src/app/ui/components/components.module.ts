import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeModule } from './home/home.module';
import { ProductsModule } from './products/products.module';
import { BasketsModule } from './baskets/baskets.module';
import { RegisterModule } from './register/register.module';
import { LoginModule } from './login/login.module';
import { UpdatePasswordComponent } from './update-password/update-password.component';
import { PasswordResetModule } from './password-reset/password-reset.module';
import { UpdatePasswordModule } from './update-password/update-password.module';



@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    HomeModule,
    ProductsModule,
    BasketsModule,
    RegisterModule,
    PasswordResetModule,
    UpdatePasswordModule
  ],
  exports:[
    BasketsModule
  ]
})
export class ComponentsModule { }
