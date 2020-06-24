import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms' 
import { MyServiceService } from './../my-service.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  form: FormGroup;
  
  constructor( public forms: FormBuilder,public serv : MyServiceService,private route:Router) { 
    this.form = this.forms.group({
      phone: ['', [Validators.required,Validators.pattern("^((\\+91-?)|0)?[0-9]{10}$")]]
    })
  }

  ngOnInit() {
  }

  post_phoneNo(){
  
    let data={'phone':'+91'+this.form.get('phone').value};
    this.serv.getotp(data).subscribe(
      
      response=>{
        this.form.reset();
        this.route.navigate(["/verify-page"]);
        // console.log(response);
      },error=>{
        console.log(error);
      });
  }
}
