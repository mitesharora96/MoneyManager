import {Injectable} from '@angular/core';
import {Http,Response} from '@angular/http';
import {Observable} from 'rxjs/observable'
import 'rxjs/add/operator/map'


@Injectable()

export class DbService{

    constructor(private http:Http){}

     getTransactions(){
        return  this.http.get('../assets/transaction.json').map(
            (res)=>res.json()
        )
     }

}