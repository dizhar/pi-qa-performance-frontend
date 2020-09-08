import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpParams } from '@angular/common/http';
import { retry, catchError } from 'rxjs/operators';
import { throwError, Observable } from 'rxjs';

@Injectable({
	providedIn: 'root'
})
export class DataService {
	results: Object;
	// private REST_API_SERVER = "http://104.208.220.28:3000";
	// private backend_ip=`${process.env.HOST_IP}`
	private backend_ip="104.208.220.28"

	private backend_port="3000"

	private REST_API_SERVER = `http://${this.backend_ip}:${this.backend_port}`

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

	sendPostRequest(data: object[]): Observable<any> {
		return this.httpClient.post<any>(this.REST_API_SERVER, data).pipe(retry(3), catchError(this.handleError));
	}

	public setResuls(data: Object): Object {
		this.results = data;
		return data;
	}

	public getResults(): Object {
		return this.results;
	}

	public deleteTempConfigFile(list: string[]): Observable<object> {
		console.log("list:", list);
		return this.httpClient.post<any>(`${this.REST_API_SERVER}/remove`, list).pipe(retry(3), catchError(this.handleError));
	}
}
