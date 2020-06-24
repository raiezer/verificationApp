import { Http } from '@angular/http';
import { HttpClient,HttpHeaders } from '@angular/common/http'; 
import { Injectable } from '@angular/core';
import { map, catchError } from 'rxjs/operators';
@Injectable({
  providedIn: 'root'
})

export class MyServiceService {
 
  phone_no;
  searched_data;
  constructor(private http :HttpClient) { }

  public getotp(data){ 
    this.phone_no=data['phone'];
    let url='http://ec2-13-59-62-104.us-east-2.compute.amazonaws.com:8090/api/v1/user/get_otp/';
  
    return this.http.post(url ,data);
  }

  public verifyOtp(data){
    let url="http://ec2-13-59-62-104.us-east-2.compute.amazonaws.com:8090/api/v1/user/get_access_token/";
    return this.http.post(url,data)
    .pipe(map(user => {
      if (user && user['access']) {
        localStorage.setItem('access', user['access']);
        }
    }),
    );
  }


  getHttpOptions(){
    return {
      headers: new HttpHeaders({
        'Content-Type':  'application/json',
        'Authorization':  "JWT "+localStorage.getItem('access')
      })
    };
  }

  getList(page=1,query=''){
    let base_url='http://ec2-13-59-62-104.us-east-2.compute.amazonaws.com:8090/api/v1/fish'
    let url=base_url+'?page='+page+'&search='+query
    let httpOptions = this.getHttpOptions();
    // console.log(url);
    return this.http.get(url,httpOptions)
  }

  isAuthorized(){
    if(localStorage.getItem('access'))
      return true;
    else
      return false;
  }
 
}
// code