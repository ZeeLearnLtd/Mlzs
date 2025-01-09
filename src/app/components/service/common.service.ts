import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class CommonService {
  baseUrl = environment.api_url
  constructor(private http: HttpClient) { }

  saveData(obj:any): Observable<any> {
    return this.http.post<any>(this.baseUrl + 'V1/ZeeparentEnquiry',obj);
  }
  savefranchiseeData(obj:any): Observable<any> {
    return this.http.post<any>(this.baseUrl + 'V1/ZeeEnquiry',obj);
  }

  getOtp(mobNo:any):Observable<any>{
    return this.http.post<any>(this.baseUrl + 'V1/SendSms_Clientbcbc',mobNo);
  }
  getState_countryList():Observable<any>{
    return this.http.post<any>(this.baseUrl + 'V1/CentreList',{});
  }

  get_allCountryList():Observable<any>{
    return this.http.post<any>(this.baseUrl + 'V1/kidzeeList',{});
  }
  
  public savesession(key: string, value: string): void {
    window.sessionStorage.removeItem(key);
    window.sessionStorage.setItem(key, value);
  }
  public getsession(key: string): string | null {
    return window.sessionStorage.getItem(key);
  }
  setencrypt(value:string){    
    return btoa(value);
  }
  getencrypt(value:string){ 
    return atob(value);
  }
}
