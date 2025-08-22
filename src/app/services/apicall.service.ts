import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { from, Observable, throwError } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
@Injectable({
  providedIn: 'root',
})
export class ApicallService {

  form_baseUrl = environment.api_url
  globelApi = environment.api_url;
  cmsBaseUrl = environment.cmsapi_url;
  constructor(private httpClient: HttpClient) { }

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

  checkMicrosite(data: any): Observable<any> {
    return this.httpClient.post(environment.cmsapi_url + 'checkIsmicrosite', data);

  }

  saveEnquiryData(obj: any): Observable<any> {
    return this.httpClient.post<any>(this.form_baseUrl + 'V1/ZeeEnquiry', obj);
  }

  getAllAdmissionData(): Observable<any> {
    //return this.httpClient.post<any>(this.globelApi + 'api/V1/GetFranchiseeDetailsepf', {});
    return this.httpClient.post<any>(this.globelApi + 'api/V1/GetFranchiseeDetailsepfWebsite', {});
  }

  getContentDataList(jdata: any): Observable<any> {
    return this.httpClient.post(this.cmsBaseUrl + 'GetContentbytype', jdata)
  }

  savefranchiseeData(obj: any): Observable<any> {
    return this.httpClient.post<any>(this.globelApi + 'api/V1/mlzspartner', obj);
  }

  getOtp(mobNo: any): Observable<any> {
    // return this.httpClient.post<any>(this.form_baseUrl + 'V1/SendSms_Clientbcbc', mobNo);
    return this.httpClient.post<any>(this.globelApi + 'Kidzeewebapi/V1/SendSms_Clientbcbc', mobNo)
  }
  getState_countryList(): Observable<any> {
    return this.httpClient.post<any>(this.globelApi + 'api/V1/GetFranchiseeDetailselp', {});
  }

  get_allCountryList(): Observable<any> {
    return this.httpClient.post<any>(this.form_baseUrl + '/Kidzeewebapi/V1/kidzeeList', {});
  }

  getBlogsDetails(jdata: any): Observable<any> {
    return this.httpClient.post(this.cmsBaseUrl + 'Getblogdata', jdata)
  }

  postAdmissionForm(obj: any): Observable<any> {
    return this.httpClient.post(this.globelApi + 'api/V1/mlzsadmission', obj)
  }
}
