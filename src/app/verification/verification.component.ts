import { Component, OnInit } from '@angular/core';
import { MyServiceService } from './../my-service.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-verification',
  templateUrl: './verification.component.html',
  styleUrls: ['./verification.component.css']
})
export class VerificationComponent implements OnInit {
  otp:string='';
  config={
    allowNumbersOnly: true,
    length: 6,
  };
  
  constructor(public serv : MyServiceService,public route:Router) { }

  ngOnInit() {
  }
  onOtpChange(otp){
    this.otp=otp
    
  }
  verifyData(){
    // console.log("My otp:"+this.otp);
    let otpData={'username':this.serv.phone_no,'password':this.otp};
    this.serv.verifyOtp(otpData).subscribe(
     response=>{
        this.route.navigate(["/product-page"]);
        // console.log(response);
      },error=>{
         
         alert("Invalid otp");
         this.route.navigate(["/login-page"]);
     });
 }
  
}
