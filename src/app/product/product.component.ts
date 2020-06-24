import { Component, OnInit } from '@angular/core';
import { MyServiceService } from '../my-service.service';
import { Router,ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit {

  details={'page':undefined,'query':undefined};
  data;
  result;


  constructor( public serv: MyServiceService, private router:Router,public route: ActivatedRoute) { }

  ngOnInit() {
    if(!this.serv.isAuthorized()){
      this.router.navigate(['/login-page']);
    }   else{
      this.route.queryParams.subscribe(
        params =>{
          this.details.page= params.page;
          this.details.query=params.query;
          this.getlist(this.details.page,this.details.query)
 });
        
      
    }
  }
  
  getlist(page= 1, query='') {
    this.serv.getList(page ,query).subscribe(
      response=>{
        this.data=response;
        this.result=response['results']
        // console.log(this.data);
        // console.log("my result:",this.result);
      },
      error=>{
        console.log(error);
       });
  }
  search(f){
    // console.log(f.value);
    this.serv.searched_data=f.value;
    console.log(this.serv.searched_data);
    this.router.navigate(["/product-page"],{queryParams: { page:1,query:f.value.category}});
    f.reset();
 }
}
