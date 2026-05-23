import { Inject, Injectable, PLATFORM_ID } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { catchError, Observable, throwError } from 'rxjs';
import { isPlatformBrowser } from '@angular/common';
@Injectable({
  providedIn: 'root'
})
export class CommonService {
  baseUrl = environment.api_url
  base_kub_url = environment.kub_url
  constructor(private http: HttpClient,
    @Inject(PLATFORM_ID) private platformId: Object
  ) { }

  saveData(obj: any): Observable<any> {
    // return this.http.post<any>(this.baseUrl + 'V1/ZeeparentEnquiry', obj);
    return this.http.post<any>(this.base_kub_url + 'Zohosync_parentEnquiry', obj);
  }
  savefranchiseeData(obj: any): Observable<any> {
    // return this.http.post<any>(this.baseUrl + 'V1/ZeeEnquiry', obj);
    return this.http.post<any>(this.base_kub_url + 'Zohosync_Enquiry', obj);
  }

  getOtp(mobNo: any): Observable<any> {
    // return this.http.post<any>(this.baseUrl + 'V1/SendSms_Clientbcbc', mobNo);
    return this.http.post<any>(this.base_kub_url + 'SendSms_Clientbcbc', mobNo);
  }
  getState_countryList(): Observable<any> {
    return this.http.post<any>(this.baseUrl + 'V1/CentreList', {});
  }

  get_allCountryList(): Observable<any> {
    return this.http.post<any>(this.baseUrl + '/api/V1/mlzslist', {});
  }
  get_centerdatabyslug(input: any): Observable<any> {
    return this.http.post<any>(this.baseUrl + '/api/V1/mlzslist', input).pipe(
      catchError((error) => {
        console.error('get_centerdatabyslug API error:', error);
        return throwError(() => error); // rethrow so subscriber can handle it
      })
    );
  }
  searchDataList(obj: any): Observable<any> {
    return this.http.post<any>('https://cmsapi.zeelearn.com' + '/searchwebsite', obj);
  }
  public savesession(key: string, value: string): void {
    if (isPlatformBrowser(this.platformId)) {
      window.sessionStorage.removeItem(key);
      window.sessionStorage.setItem(key, value);
    }
  }

  public getsession(key: string): string | null {
    return window.sessionStorage.getItem(key);
  }
  setencrypt(value: string) {
    return btoa(value);
  }
  getencrypt(value: string) {
    return atob(value);
  }
}
