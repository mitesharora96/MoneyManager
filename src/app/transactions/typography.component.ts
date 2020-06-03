import { Component, OnInit,ViewChild } from '@angular/core';
import {DbService} from '../db.service'
import { Time } from '@angular/common';
import {MatPaginator} from '@angular/material/paginator';
import {MatTableDataSource} from '@angular/material/table';


export interface TransactionData {
  
  transaction_id:string;
	Amount:number;
	Category:string;
	Notes:string;
	Date:Date;
	Time:Time
	Mode_of_payment:string;
}



@Component({
  selector: 'app-typography',
  templateUrl: './typography.component.html',
  styleUrls: ['./typography.component.css']
})
export class TypographyComponent implements OnInit {

  constructor(private db :DbService) { }

 
  //transactionData:TransactionData[];
  transactionData:any[];
  spending:any=5000;//this.transactionData[0].Amount;
  displayedColumns: string[] = ['Date', 'Time', 'Category', 'Notes','Amount'];
  //dataSource = new MatTableDataSource<TransactionData>(this.transactionData);
  dataSource=this.transactionData
 
  ngOnInit() {
    //this.dataSource.paginator = this.paginator;
     this.db.getTransactions().subscribe(
       (data)=> this.transactionData=data
     );
     console.log(this.transactionData);
    // this.spending=this.transactionData[0].Amount;
    
     
  }

  

 // @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  

}
