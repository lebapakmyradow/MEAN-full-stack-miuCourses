import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import { UsersService } from '../users.service';


export class UserCredential{
  _id!:string;
  name!:string;
  username!:string;
  password!:string;
  constructor(_id:string, name:string, username:string, password:string){
    this._id = _id;
    this.name = name;
    this.username = username;
    this.password = password;
  }
}

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  notificationMessage!:string;
  isError:boolean = false;
  isSuccess:boolean = false;
  constructor(private userService:UsersService, private router: Router) { }

  ngOnInit(): void {
  }

  onRegistration(myForm:NgForm){
    if(myForm.value.password!==myForm.value.confirm_password){
      this.displayMessage(environment.MSG_REG_PAS_EMP, true);
      return;
    }
    this.userService.register(this.fillForm(myForm.value)).subscribe({
      next:(result)=>{
        console.log("next", result);
        this.displayMessage(environment.REGIS_SUCCESS, false);
        //this.router.navigate(["courses"])
      }, 
      error:(err)=>{
        this.displayMessage(err.error, true);
        console.log("error", err);
      }, 
      complete:()=>{
        console.log("complete");
      }
    });
  }
  displayMessage(message:string, isErrMsg:boolean){
    this.notificationMessage = message;
    if(isErrMsg){
      this.isError = true;
      this.isSuccess = false;
    } else{
      this.isError = false;
      this.isSuccess = true;
    }
  }

  fillForm(formData:UserCredential):UserCredential{
    console.log(formData);
    const userCredential:UserCredential = new UserCredential("", formData.name, formData.username, formData.password);
    return userCredential;
  }

}
