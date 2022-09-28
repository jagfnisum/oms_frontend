import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginPageComponent } from './login/login.component';
import { OrderTableComponent } from './order-table/order-table.component';
import { AuthGuard } from './services/auth.guard';
//
const routes: Routes = [ 
  {path:'orders', component: OrderTableComponent, canActivate: [AuthGuard]},
  {path:'login', component: LoginPageComponent},
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  // { path: '*', redirectTo: 'login', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
