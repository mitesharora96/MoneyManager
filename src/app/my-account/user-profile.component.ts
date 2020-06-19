import { Component, OnInit } from '@angular/core';
import {DbService} from '../db.service'
import { Observable} from 'rxjs';

export interface ProfileData {
  
  Username:string,
	email:string,
	FirstName:string,
	LastName:string,
	Address:string,
	City:string,
	Country:string
}

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent implements OnInit {

  MyProfileData:ProfileData
  constructor(private db :DbService ) { }

  onFormSubmit(){
    this.db.addTransaction(this.MyProfileData).subscribe(
      (data)=> {
       console.log(`add profile data loop ${data}`);
      },
      err => {
       console.log(err);
     })

    console.log("Inside add profile data")
    alert("Your Profile has been updated.");
  }

  ngOnInit() {

    this.db.getMyprofile().subscribe(
      (data)=> {
        this.MyProfileData=data;
       console.log(`My Profile inside loop ${data}`);
       console.log(this.MyProfileData.Username);
      },
      err => {
       console.log(err);
     }

    );

   

  }

}
