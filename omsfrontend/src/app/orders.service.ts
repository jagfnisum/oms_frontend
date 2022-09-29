import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class OrdersService {

  baseUrl = 'http://localhost:8080/api/order/getOrders'; 
  testUrl = 'https://jsonplaceholder.typicode.com/users';

  orderDetailsUrl = 'http://localhost:8080/api/order/items/getOrderInfo/';

  addressUrl = 'http://localhost:8081/api/address/getAddress/';

  constructor(private http: HttpClient) { }

  getOrderDetails(order_id : string) {
    return this.http.get<any>(`${this.orderDetailsUrl}`+order_id)
  }

  getAllOrders() {
    return this.http.get<any>(`${this.baseUrl}`);
  }

  getAddress(address_id: string){
    return this.http.get<any>(`${this.addressUrl}` + address_id);
  }

  testOrders(){
    return this.http.get<any>(`${this.testUrl}`);
  }

}
