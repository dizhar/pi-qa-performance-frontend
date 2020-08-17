import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpParams } from '@angular/common/http';
import { retry, catchError } from 'rxjs/operators';
import {  throwError, Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class DataService {
  pageXray: Object; 
  private REST_API_SERVER = "http://localhost:3000";


  constructor(private httpClient: HttpClient) { }


  handleError(error: HttpErrorResponse) {
    let errorMessage = 'Unknown error!';
    if (error.error instanceof ErrorEvent) {
      // Client-side errors
      errorMessage = `Error: ${error.error.message}`;
    } else {
      // Server-side errors
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    window.alert(errorMessage);
    return throwError(errorMessage);
  }


    sendPostRequest(data: {}): Observable<any> {
      console.log("send data:", data);
      return this.httpClient.post<any>(this.REST_API_SERVER, data).pipe(retry(3), catchError(this.handleError));
 }



  public setResuls(data: Object): Object {
    console.log("get Results1", data);
        this.pageXray = data;
        console.log("get Results2", this.pageXray);
        return this.pageXray;
  }
  public getPageExray(): Object{
      return  this.pageXray
  }



}
