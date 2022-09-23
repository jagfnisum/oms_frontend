import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class OrdersService {

  baseUrl2 = 'http://localhost:8080/api/order/getOrders'; 
  baseUrl = 'https://jsonplaceholder.typicode.com/users';
  constructor(private http: HttpClient) { }

  getAllOrders() {
    return this.http.get<any>(`${this.baseUrl}`);
  }

  getAllOrders2(){
    return this.http.get<any>(`${this.baseUrl2}`);
  }

}
