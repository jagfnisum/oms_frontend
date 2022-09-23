import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class OrdersService {

  baseUrl = 'http://localhost:8080/api/order/getOrders'; 

  constructor(private http: HttpClient) { }

  getAllOrders(){
    return this.http.get<any>(`${this.baseUrl}`);
  }
  
}
