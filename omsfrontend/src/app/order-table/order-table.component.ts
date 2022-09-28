import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { OrdersService } from '../orders.service';
import { SocialAuthService } from 'angularx-social-login';
import { Router } from '@angular/router';


@Component({
  selector: 'order-table',
  templateUrl: './order-table.component.html',
  styleUrls: ['./order-table.component.css']
})
export class OrderTableComponent implements OnInit {

  isShow = true; 

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
  dataSource_oid!: MatTableDataSource<any>;
  dataSource_uid!: MatTableDataSource<any>;
  dataSource_status!: MatTableDataSource<any>;

  /* 
    Displayed column names will be different from property value of the actual
     order object
  */
  displayOrderTable = {
    orderID: 'order_id',
    userId: 'user_id',
    addressID: 'address_id',
    creditCardID: 'credit_card_id',
    dateOrdered: 'date_ordered',
    dateShipped: 'date_shipped',
    price: 'price',
    orderStatus: 'order_status'
  };

  

  //used in material table to find the index/row of a table item
  selectedRowIndex: any = null;

  constructor(
    private service: OrdersService,
    private readonly _authService: SocialAuthService,
    private router: Router) { }

  ngOnInit() {
    // this.service.getAllOrders().subscribe((response:any) =>{
    //   console.log(response);
    //   console.log("second method");
    //   this.orders = response;
    //   this.dataSource = new MatTableDataSource(response);
    //   this.dataSource.paginator = this.paginator;
    //   this.dataSource.sort = this.matSort;
    // })

    this.service.getAllOrders2().subscribe((response: any) => {
      this.orders = response;
      this.dataSource = new MatTableDataSource(response);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.matSort;


      this.dataSource_oid = new MatTableDataSource(response);
      this.dataSource_oid.filterPredicate = (data : any, filter : any) => {
        return data.orderID == filter;
      };

      this.dataSource_uid = new MatTableDataSource(response);
      this.dataSource_uid.filterPredicate = (data : any, filter : any) => {
        return data.userId == filter;
      };

      this.dataSource_status = new MatTableDataSource(response);
      this.dataSource_status.filterPredicate = (data : any, filter : any) => {
        return data.orderStatus == filter;
      };

      // console.log(response);
    })
  }

  filterData($event: any) {
    this.dataSource = this.dataSource
    this.dataSource.filter = $event.target.value;
  }

  filterOrderID($event: any) {
    this.dataSource = this.dataSource_oid;
    this.dataSource.filter = $event.target.value;
  }  

  filterUserID($event: any) {
    this.dataSource = this.dataSource_uid;
    this.dataSource.filter = $event.target.value;
  }  

  filterStatus($event: any) {
    this.dataSource = this.dataSource_status;
    this.dataSource.filter = $event.target.value;
  }

  /*
    Will return the dom reference of the current row selected
    will get called on button click by default
  */
  selectedRow(row: any) {
    console.log('selectedRow', row);
  }

  // show hide for the more search bars
  showOrHide(){
    this.isShow = !this.isShow;
  }

  signOut(): void {
    this._authService.signOut();
    localStorage.removeItem('APP_TOKEN');
    this.router.navigate(['/login']);
    console.log("Signed OUT")
  }

}
