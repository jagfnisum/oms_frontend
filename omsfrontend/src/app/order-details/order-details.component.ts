import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';

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

  testRespone: string = '';

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
    public dialogRef: MatDialogRef<OrderDetailsComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData) {

    this.dataSource = new MatTableDataSource(data.orderItems);

  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.matSort;  
  }


  filterData($event: any) {
    this.dataSource.filter = $event.target.value;
  }

}
