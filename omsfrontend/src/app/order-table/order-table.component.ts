import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { OrdersService } from '../orders.service';
import { SocialAuthService } from 'angularx-social-login';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { OrderDetailsComponent } from '../order-details/order-details.component';


@Component({
  selector: 'order-table',
  templateUrl: './order-table.component.html',
  styleUrls: ['./order-table.component.css']
})
export class OrderTableComponent implements OnInit {

  @ViewChild('paginator') paginator!: MatPaginator;
  @ViewChild(MatSort) matSort!: MatSort;
  orders = [];

  displayedColumns = [
    'orderID',
    'userId',
    'addressID',
    'creditCardID',
    'dateOrdered',
    'dateShipped',
    'price',
    'orderStatus'
  ];
 
  dataSource!: MatTableDataSource<any>;

  /* 
    Displayed column names will be different from property value of the actual
     order object
  */
  displayOrderTable = {
    orderID: 'orderID',
    userId: 'userId',
    addressID: 'addressID',
    creditCardID: 'creditCardID',
    dateOrdered: 'dateOrdered',
    dateShipped: 'dateShipped',
    price: 'price',
    orderStatus: 'orderStatus'
  };

  

  //used in material table to find the index/row of a table item
  selectedRowIndex: any = null;

  constructor(private service: OrdersService,
    private readonly _authService: SocialAuthService,
    private router: Router,
    private dialogRef: MatDialog) { }

  ngOnInit() {
    this.service.getAllOrders().subscribe((response: any) => {
      this.orders = response;
      this.dataSource = new MatTableDataSource(response);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.matSort;
    })

  }

  filterData($event: any) {
    this.dataSource.filter = $event.target.value;
  }

  openDialog(response: any, id :string){
    this.dialogRef.open(OrderDetailsComponent, {
      width: '70%',
      data: {response: response, orderid: id}
    })
  }


  /*
    Will return the dom reference of the current row selected
    will get called on button click by default
  */
  selectedRow(row: any) {
    this.openDialog(row.orderItems,row.orderID);
  }

  signOut(): void {
    this._authService.signOut();
    localStorage.removeItem('APP_TOKEN');
    this._authService.authState.subscribe((user) => {
        this.router.navigate(['/login']);
    });
  }

}
