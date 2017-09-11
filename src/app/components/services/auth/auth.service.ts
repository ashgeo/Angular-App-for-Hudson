import { Injectable } from '@angular/core';
import { Http, Headers, Response, RequestOptions } from '@angular/http';
import {APIBaseClass} from '../apibaseclass/apiBaseClass';
import { Observable } from 'rxjs';
import 'rxjs/add/operator/map'

@Injectable()
export class AuthService extends APIBaseClass {
    isLoggedin: boolean;
    public token: string;
    private urlExtension="/token";
    //private logedinUSer: any;
   // private tokenEndPointUrl = 'http://localhost:60776';
    //options: any;
   // error = "";
    // constructor(public http: Http) {
    // }

    login(usercredentials: any) {
        this.isLoggedin = false;
        var myHeaders = new Headers();
        var credentials = 'grant_type=' + 'password' + '&username=' + usercredentials.username + '&password=' + usercredentials.password;
        myHeaders.append('Content-Type', 'application/x-www-form-urlencoded');
        let options = new RequestOptions({ headers: myHeaders });
        return this.http.post(this.EndPointUrl + this.urlExtension, credentials,options)
            .map((response: Response) => {
                let user = response.json();
                if (user && user.access_token) {
                    window.localStorage.setItem('currentUser', JSON.stringify(user));
                    
                    this.isLoggedin = true;
                }
            });
    }
    logout() {
        localStorage.removeItem('currentUser');

    }
    isLogedIn() {
        if (localStorage.getItem('currentUser')) {
            return true;
        }
        else {
            return false;
        }
    }

}