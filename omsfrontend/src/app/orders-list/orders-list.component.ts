import { Component, OnInit } from '@angular/core';
import { OrdersService } from '../orders.service';

@Component({
  selector: 'app-orders-list',
  templateUrl: './orders-list.component.html',
  styleUrls: ['./orders-list.component.css']
})

export class OrdersListComponent implements OnInit {

  constructor(private orderService: OrdersService) { }

  searchText='';
  orders: any = []

  ngOnInit(): void {
    this.orderService.getAllOrders().subscribe(orders => {
      this.orders = orders;
      // console.log(orders);
    });

  }

}
