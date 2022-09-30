import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { OrdersService } from '../orders.service';

export interface DialogData {
  orderid: string;
  orderItems: any[];
  addressID: string;
  creditCardID: string;
}


@Component({
  selector: 'app-order-details',
  templateUrl: './order-details.component.html',
  styleUrls: ['./order-details.component.css']
})
export class OrderDetailsComponent implements OnInit {


  @ViewChild('paginator') paginator!: MatPaginator;
  @ViewChild(MatSort) matSort!: MatSort;

  dataSource!: MatTableDataSource<any>;

  ngOnInit(): void {

  }

  streetAddr = ' ';
  creditCard =  ' ';
  orderDetails = [];
  selectedRowIndex: any = null;

  displayedColumns = [
    'orderItemid',
    'upc',
    'quantity',
  ];


  /* 
   Displayed column names will be different from property value of the actual
    order object
 */
  displayOrderDetailsTable = {
    orderItemid: 'orderItemid',
    upc: 'upc',
    quantity: 'quantity',
  };

  constructor(
    private service: OrdersService,
    public dialogRef: MatDialogRef<OrderDetailsComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData) {

    this.dataSource = new MatTableDataSource(data.orderItems);

    this.service.getAddress(data.addressID).subscribe((response: any) => {

      this.streetAddr = response.street
      if (response.street2 != null) {
        this.streetAddr += ' ' + response.street2
      }
      this.streetAddr += ', ' + response.city + ', ' + response.state + ' ' + response.zip

    })

    this.service.getCreditCard(data.creditCardID).subscribe((Response:any)=>{
      this.creditCard = Response.card_number.substring(12)
    })

  }


  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.matSort;
  }


  filterData($event: any) {
    this.dataSource.filter = $event.target.value;
  }

}
