import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { VerificationComponent } from './verification/verification.component';

import { ProductComponent } from './product/product.component';

const routes: Routes = [
  {
    path :'',
    component:LoginComponent
  },
  {
    path:'login-page',
    component:LoginComponent
  },
  {
    path:'verify-page',
    component:VerificationComponent
  },
  {
    path:'product-page',
    component:ProductComponent
  },
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
