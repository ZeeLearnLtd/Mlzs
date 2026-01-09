import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { EMPTY, from, Observable, of, throwError } from 'rxjs';
import { map, catchError, tap, filter } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { Route,Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class ApicallService {

  form_baseUrl = environment.api_url
  globelApi = environment.api_url;
  cmsBaseUrl = environment.cmsapi_url;
  constructor(private httpClient: HttpClient,private route:Router) { }

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
          console.log(error);
          return throwError('Something went wrong!');
        })
        
      )
      
    //      map((res: any) => res?.data),
    // tap(data => {
    //   if (!data) {
    //     this.route.navigateByUrl('page-not-found');
    //   }
    // }),
    // filter(data => !!data) // 
    //   );
  }
  getGetblog(tbody: any) {
    let headers: HttpHeaders = new HttpHeaders();
    headers = headers.append('Accept', 'application/json');
    headers = headers.append('dbid', '0');
    return this.httpClient
      .post(environment.cmsapi_url + `Getblogdata`, tbody, { headers: headers })
      .pipe(
         map((data: any) => {
          if(data && Object.keys(data.data).length > 0){
            return data;
          }else{
            this.route.navigateByUrl('page-not-found');
          }
          
        }),
        catchError((error) => {
          console.log(error);
          return throwError('Something went wrong!');
        })
             
  )
  }

  fnnotfound(){
    this.route.navigateByUrl('page-not-found');
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
  sendSms(otpobject:any) {
    return this.httpClient.post(this.cmsBaseUrl+'/'+'SendSms_Clientbcbc', otpobject);
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
