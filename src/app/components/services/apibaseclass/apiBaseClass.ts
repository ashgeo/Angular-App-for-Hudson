import { Injectable } from '@angular/core';
import { Http, Headers, Response, RequestOptions } from '@angular/http';
import { AlertService } from '../alert/alert.service';
import { Shared } from '../shared/shared.service';
@Injectable()
export class APIBaseClass {
    //public EndPointUrl = 'http://clipper-api.mavericktechlabs.com.au';
   public EndPointUrl= Shared.BASE_URL_ENDPOINT;  
    public  currentUser= "";
    public options="";
   // public  headers =null;
    

    constructor(public http: Http, public alertService: AlertService,options: RequestOptions) {
        // this.headers = new Headers();
          this.currentUser = localStorage.getItem('currentUser'); 
         // headers.append('Authorization', `Bearer ${this.currentUser}`);
    }

     public parseCurrentUser(user: any) {
        var parrsedCurrentUser = JSON.parse(user)
        var token = parrsedCurrentUser.access_token;
        return token;
    }
}