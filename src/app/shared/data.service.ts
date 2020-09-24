import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpParams } from '@angular/common/http';
import { retry, catchError } from 'rxjs/operators';
import { throwError, Observable } from 'rxjs';

export interface Config {
	BACKEND_IP: string;
	BACKEND_PORT: string;
	HOST_ADDRESS: string;
}

@Injectable({
	providedIn: 'root'
})
export class DataService {
	results: Object;

	private configUrl = 'assets/json/runtime.json';
	private REST_API_SERVER //= `http://${this.backend_ip}:${this.backend_port}`

	private config

	constructor(private httpClient: HttpClient) { 
	
		this.getConfig()
			.subscribe((data: Config) => {
				console.log(data);

				this.config = {
					backendIP: data.BACKEND_IP,
					backendPort:  data.BACKEND_PORT,
					host_address: data.HOST_ADDRESS
				};

				console.log(this.config);

				if (this.config.host_address != "" ){
					this.REST_API_SERVER = `https://${this.config.host_address}/be`;
				} else {
					this.REST_API_SERVER = `http://${this.config.backendIP}:${this.config.backendPort}`;
				}
				console.log(this.REST_API_SERVER);

				
		});
	}

	getConfig() {
		return this.httpClient.get(this.configUrl);
	}	

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
		//this.REST_API_SERVER = `http://${this.config.backendIP}:${this.config.backendPort}`;

		console.log(this.REST_API_SERVER);
		console.log(data);

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
