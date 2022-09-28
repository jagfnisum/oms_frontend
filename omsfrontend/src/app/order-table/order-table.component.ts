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
  selectedSearchCategory = "";

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

  theSource!: MatTableDataSource<any>;
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

    this.service.getAllOrders2().subscribe((response: any) => {
      this.orders = response;
      this.dataSource = new MatTableDataSource(response);
      this.theSource =new MatTableDataSource(response);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.matSort;

      // search with orderID column
      this.dataSource_oid = new MatTableDataSource(response);
      this.dataSource_oid.filterPredicate = (data : any, filter : any) => {
        return data.orderID == filter;
      };
      
      // search with userId column
      this.dataSource_uid = new MatTableDataSource(response);
      this.dataSource_uid.filterPredicate = (data : any, filter : any) => {
        return data.userId == filter;
      };
     
      // search with orderStatus column
      this.dataSource_status = new MatTableDataSource(response);
      this.dataSource_status.filterPredicate = (data : any, filter : any) => {
        return data.orderStatus.toLowerCase().includes(filter.toLowerCase());
      };

    })
  }

  filterData($event: any) {
    if(this.selectedSearchCategory == "all") {
        this.dataSource = this.theSource; 
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.matSort;
    } 
    if (this.selectedSearchCategory == "oid") {
        this.dataSource = this.dataSource_oid;
        this.dataSource_oid.paginator = this.paginator;
        this.dataSource_oid.sort = this.matSort;
    }
    if (this.selectedSearchCategory == "uid") {
        this.dataSource = this.dataSource_uid;
        this.dataSource_uid.paginator = this.paginator;
        this.dataSource_uid.sort = this.matSort;
    }
    if (this.selectedSearchCategory == "status"){
        this.dataSource = this.dataSource_status;
        this.dataSource_status.paginator = this.paginator;
        this.dataSource_status.sort = this.matSort;
    }

    this.dataSource.filter = $event.target.value;
  }

  handleDropdown(event: any) {
    this.selectedSearchCategory = event.target.value;
    console.log(event.target.value);
  }

  /*
    Will return the dom reference of the current row selected
    will get called on button click by default
  */
  selectedRow(row: any) {
    console.log('selectedRow', row);
  }


  signOut(): void {
    this._authService.signOut();
    localStorage.removeItem('APP_TOKEN');
    this.router.navigate(['/login']);
    console.log("Signed OUT")
  }

}
