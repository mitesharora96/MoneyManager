import { Component, OnInit,ViewChild } from '@angular/core';
import {DbService} from '../db.service'
import { Time } from '@angular/common';
import {BehaviorSubject, Observable} from 'rxjs';
import { addTransactionComponent } from 'app/AddTransaction/addTransaction.component';
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';

export interface TransactionData {
  
  transaction_id:string;
	Amount:number;
	Category:string;
	Notes:string;
	Date:string;
	Time:string;
	Mode_of_payment:string;
}

const Tdata:TransactionData[]=[
  {transaction_id:'1',Amount:200,Category:'Electricity',Notes:'Elec bill march',Date:'02/05/2020',Time:'12:00:00',Mode_of_payment:'Cash'},
  {transaction_id:'2',Amount:200,Category:'Electricity',Notes:'Elec bill march',Date:'02/05/2020',Time:'12:00:00',Mode_of_payment:'Cash'},
  {transaction_id:'3',Amount:200,Category:'Electricity',Notes:'Elec bill march',Date:'02/05/2020',Time:'12:00:00',Mode_of_payment:'Cash'},
  {transaction_id:'4',Amount:200,Category:'Electricity',Notes:'Elec bill march',Date:'02/05/2020',Time:'12:00:00',Mode_of_payment:'Cash'},
];

export interface PeriodicElement {
  name: string;
  position: number;
  weight: number;
  symbol: string;
}

const ELEMENT_DATA: PeriodicElement[] = [
  {position: 1, name: 'Hydrogen', weight: 1.0079, symbol: 'H'},
  {position: 2, name: 'Helium', weight: 4.0026, symbol: 'He'},
  {position: 3, name: 'Lithium', weight: 6.941, symbol: 'Li'},
  {position: 4, name: 'Beryllium', weight: 9.0122, symbol: 'Be'},
  {position: 5, name: 'Boron', weight: 10.811, symbol: 'B'},
  {position: 6, name: 'Carbon', weight: 12.0107, symbol: 'C'},
  {position: 7, name: 'Nitrogen', weight: 14.0067, symbol: 'N'},
  {position: 8, name: 'Oxygen', weight: 15.9994, symbol: 'O'},
  {position: 9, name: 'Fluorine', weight: 18.9984, symbol: 'F'},
  {position: 10, name: 'Neon', weight: 20.1797, symbol: 'Ne'},
];

@Component({
  selector: 'app-typography',
  templateUrl: './typography.component.html',
  styleUrls: ['./typography.component.css']
})
export class TypographyComponent implements OnInit {

  private transactData$: BehaviorSubject<string> = new  BehaviorSubject<string>('');
  public $transactData: Observable<string> = this.transactData$.asObservable();
  spending:number=0; 
  i:number=0;
  walletAmount:number=80000;
  width:number;
  transactionData:TransactionData[];
  displayedColumns: string[] = ['Date', 'Time', 'Category', 'Amount','Notes'];
  //dataSource = this.transactionData;
  dataSource = new MatTableDataSource(this.transactionData);
  temp:any;
  constructor(private db :DbService) { }

  @ViewChild(MatSort, {static: true}) sort: MatSort;

  

  onAddTransaction(){
    this.db.addTransaction(ELEMENT_DATA).subscribe(
      (data)=> {
       console.log(`add data loop ${data}`);
      },
      err => {
       console.log(err);
     })

    console.log("Inside add transaction")
  }

  onTClick(){
    
    while(this.i<this.transactionData.length)
     {
       this.temp=this.transactionData[this.i].Amount;
        this.spending=this.spending+parseInt(this.temp);
        this.i++;      
     }
     this.width=(this.spending/this.walletAmount)*100;
    
    
  }

  ngOnInit() {
    
    this.db.getTransactions().subscribe(
       (data)=> {
         this.transactionData=data;
        //console.log(`inside loop sdsdsdsd ${this.transactionData}`);
        //console.log(this.transactionData)
       
       },
       err => {
        console.log(err);
      }

     );
     
     while(this.i<this.transactionData.length)
     {
       this.temp=this.transactionData[this.i].Amount;
        this.spending=this.spending+parseInt(this.temp);
        this.i++;      
     }
     this.width=(this.spending/this.walletAmount)*100;
     
     this.dataSource.sort = this.sort;

     
     this.$transactData.subscribe(value => {
       console.log(value);
     });

     this.transactData$.next('1st value emitted');
     this.transactData$.next('2nd value emitted');
     this.transactData$.next('3rd value emitted');
     this.transactData$.next('4th value emitted');
     this.transactData$.next('5th value emitted');
     this.transactData$.error('error initiased');
     this.transactData$.next('6th value is emiited');
     this.transactData$.complete();
     
  }

  

 // @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  

}
