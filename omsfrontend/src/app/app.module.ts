import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './navbar/navbar.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { TableVirtualScrollModule } from 'ng-table-virtual-scroll';
import { MatTableModule } from '@angular/material/table';
import { OrderTableComponent } from './order-table/order-table.component';


@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    OrderTableComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatTableModule,
    TableVirtualScrollModule
  ],
  providers: [ ],
  bootstrap: [AppComponent]
})
export class AppModule { }
