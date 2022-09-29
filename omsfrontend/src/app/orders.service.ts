import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class OrdersService {

  baseUrl = 'http://localhost:8080/api/order/getOrders'; 

  orderDetailsUrl = 'http://localhost:8080/api/order/items/getOrderInfo/';

  constructor(private http: HttpClient) { }

  getOrderDetails(order_id : string) {
    return this.http.get<any>(`${this.orderDetailsUrl}`+order_id)
  }

  getAllOrders() {
    return this.http.get<any>(`${this.baseUrl}`);
  }

}
