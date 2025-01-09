import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { from, Observable, throwError } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
@Injectable({
  providedIn: 'root',
})
export class ApicallService {
  constructor(private httpClient: HttpClient) {}

  getGetseo(tbody: any) {
    let headers: HttpHeaders = new HttpHeaders();
    headers = headers.append('Accept', 'application/json');
    headers = headers.append('dbid', '0');
    return this.httpClient
      .post(environment.cmsapi_url + `Getseo`, tbody, { headers: headers })
      .pipe(
        map((data: any) => {
          return data;
        }),
        catchError((error) => {
          return throwError('Something went wrong!');
        })
      );
  }
  getGetblog(tbody: any) {
    let headers: HttpHeaders = new HttpHeaders();
    headers = headers.append('Accept', 'application/json');
    headers = headers.append('dbid', '0');
    return this.httpClient
      .post(environment.cmsapi_url + `Getblogdata`, tbody, { headers: headers })
      .pipe(
        map((data: any) => {
          return data;
        }),
        catchError((error) => {
          return throwError('Something went wrong!');
        })
      );
  }
  
  checkMicrosite(data:any):Observable<any>{
    return this.httpClient.post(environment.cmsapi_url +'checkIsmicrosite',data);
    
  }
}
