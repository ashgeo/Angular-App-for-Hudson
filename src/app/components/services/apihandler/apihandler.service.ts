import { Injectable } from '@angular/core';
import { Http, Headers, Response, RequestOptions } from '@angular/http';
import { APIBaseClass } from '../apibaseclass/apiBaseClass';
import { IEmployee } from '../data/employee/employee.data';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import { Subject } from 'rxjs/Subject';

@Injectable()
export class ApiService extends APIBaseClass {

    getAuthenticatedRecord(urlExtension: string) {
        var headers = new Headers();
        headers.append('Content-Type', 'application/x-www-form-urlencoded');
        return this.http.get(this.EndPointUrl + urlExtension)
            .map((response: Response) => {
                let sales = response.json();
                if (sales) {
                    // alert(sales);             
                }
                else {
                    alert("null")
                }
            });
    }
    getRecords(urlExtension: string) {

        var headers = new Headers();
        headers.append('Content-Type', 'application/x-www-form-urlencoded');
        var token = this.parseCurrentUser(this.currentUser);
        headers.append('Authorization', `Bearer ${token}`);
        let options = new RequestOptions({ headers: headers });       
        return this.http.get(this.EndPointUrl + urlExtension, options)
            .map((response: any) => response.json())
    }

    getRecord(urlExtension: string, id: number) {

        var headers = new Headers();
        headers.append('Content-Type', 'application/x-www-form-urlencoded');
        var token = this.parseCurrentUser(this.currentUser);
        headers.append('Authorization', `Bearer ${token}`);
        let options = new RequestOptions({ headers: headers, search: 'id=' + id });
        return this.http.get(this.EndPointUrl + urlExtension, options)
            .map((response: any) => response.json())
    }
    getUserNameCheck(urlExtension: string, userName: string): Observable<any> {
        var headers = new Headers();
        headers.append('Content-Type', 'application/x-www-form-urlencoded');
        var token = this.parseCurrentUser(this.currentUser);
        headers.append('Authorization', `Bearer ${token}`);
        let options = new RequestOptions({ headers: headers, search: 'UserName=' + userName });
        return this.http.get(this.EndPointUrl + urlExtension, options)
            .map(this.extractData)
            

    }

    postRecord(urlExtension: string, model: IEmployee): Observable<any> {
        var headers = new Headers();
        headers.append('Content-Type', 'application/json');
        var token = this.parseCurrentUser(this.currentUser);
        console.log(token);
        headers.append('Authorization', `Bearer ${token}`);
        let options = new RequestOptions({ headers: headers });
        return this.http.post(this.EndPointUrl + urlExtension, model, options)
            .map(this.extractData)
           
    }

    putRecord(urlExtension: string, id: number, model: any): Observable<any> {
        let body = JSON.stringify(model);
        let headers = new Headers({ 'Content-Type': 'application/json' });
        var token = this.parseCurrentUser(this.currentUser);
        headers.append('Authorization', `Bearer ${token}`);
        let options = new RequestOptions({ headers: headers });        
        return this.http.put(this.EndPointUrl + urlExtension + id, body, options)          
            .map(this.extractData)
    }

    deleteRecord(urlExtension: string, id: number): Observable<any> {
        let headers = new Headers({ 'Content-Type': 'application/json' });
        var token = this.parseCurrentUser(this.currentUser);
        headers.append('Authorization', `Bearer ${token}`);
        let options = new RequestOptions({ headers: headers });
        return this.http.delete(this.EndPointUrl + urlExtension + id, options)
            .map(this.extractData)

    }
    private handleError(error: Response) {
        this.alertService.error(error.json().error);
        return Observable.throw(error.json().error || 'Server error');
    }
    private extractData(res: Response) {
        if (res.status == 200) {
            return 1;
        }
        else {
            return 0;
        }
    }
    private handleErrorObservable(error: Response | any) {

        console.error(error.message || error);
        return Observable.throw(error.message || error);
    }

    private handleErrorPromise(error: Response | any) {
        console.error(error.message || error);
        return Promise.reject(error.message || error);
    }

}


