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
    'order_id',
    'user_id',
    'address_id',
    'credit_card_id',
    'date_ordered',
    'date_shipped',
    'price',
    'order_status'
  ];

  dataSource!: MatTableDataSource<any>;

  /* 
    Displayed column names will be different from property value of the actual
     order object
  */
  displayOrderTable = {
    order_id: 'order_id',
    user_id: 'user_id',
    address_id: 'address_id',
    credit_card_id: 'credit_card_id',
    date_ordered: 'date_ordered',
    date_shipped: 'date_shipped',
    price: 'price',
    order_status: 'order_status'
  };

  

  //used in material table to find the index/row of a table item
  selectedRowIndex: any = null;

  constructor(private service: OrdersService,
    private readonly _authService: SocialAuthService,
    private router: Router,
    private dialogRef: MatDialog) { }

  ngOnInit() {
    // this.service.getAllOrders().subscribe((response:any) =>{
    //   console.log(response);
    //   console.log("second method");
    //   this.orders = response;
    //   this.dataSource = new MatTableDataSource(response);
    //   this.dataSource.paginator = this.paginator;
    //   this.dataSource.sort = this.matSort;
    // })

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

  openDialog(response: any){
    this.dialogRef.open(OrderDetailsComponent, {
      width: '70%',
      data: {response: response}
    })
  }


  /*
    Will return the dom reference of the current row selected
    will get called on button click by default
  */
  selectedRow(row: any) {
    //console.log('selectedRow', row);
    //console.log(row.order_id  )

    this.service.getOrderDetails(row.order_id).subscribe((response: any) => {
      console.log(response); //[0].orderid
      this.openDialog(response);

    })
    

  }

  signOut(): void {
    this._authService.signOut();
    localStorage.removeItem('APP_TOKEN');
    this.router.navigate(['/login']);
    console.log("Signed OUT")
  }

}
