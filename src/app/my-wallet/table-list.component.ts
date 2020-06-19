import { Component, OnInit } from '@angular/core';

export interface WalletData{
  walletName:string;
  walletAmount:string;
}

@Component({
  selector: 'app-table-list',
  templateUrl: './table-list.component.html',
  styleUrls: ['./table-list.component.css']
})
export class TableListComponent implements OnInit {

  WalletNotcreated:boolean=true;
  createWallet:boolean=false;
  Walletcreated:boolean=false;

  myWallet:WalletData={
    walletName:"",
    walletAmount:""
  }

  constructor() { }

  ngOnInit() {
  }

  CreateWallet(){
    this.createWallet=true;
    this.WalletNotcreated=false;
  }

  OnWalletCreated(){
    this.Walletcreated=true;
    this.createWallet=false;
  }

  OnWalletNotCreated(){
    this.WalletNotcreated=true;
    this.createWallet=false;
  }
}
