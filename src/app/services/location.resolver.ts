// import { ResolveFn } from '@angular/router';

// export const locationResolver: ResolveFn<boolean> = (route, state) => {
//   return true;
// };

import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, Router } from '@angular/router';
import { ApicallService } from './apicall.service';
import { environment } from 'src/environments/environment';
import { catchError, map, Observable, of } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class LocationResolver implements Resolve<boolean> {

  constructor(private router: Router,      private apiService: ApicallService,) {}

  // Allowed states and cities
  states: { [key: string]: string[] } = {
    'tamil-nadu': ['madurai', 'chennai', 'salem'],
    'kerala': ['kochi', 'trivandrum'],
    'karnataka': ['bangalore', 'mysore'],
    'bihar':['patna'],
  };

  resolve(route: ActivatedRouteSnapshot): Observable<boolean> {
    const state = route.paramMap.get('state')?.toLowerCase();
    const city = route.paramMap.get('city')?.toLowerCase();
    const center = route.paramMap.get('center')?.toLowerCase();
  //  if (!state || !this.states[state]) {
  //     this.router.navigate(['/page-not-found']);
  //     return false;
  //   }

  //   // Validate city exists for the state
  //   if (city && (!this.states[state].includes(city))) {
  //     this.router.navigate(['/page-not-found']);
  //     return false;
  //   }

  //   // Invalid → go to 404 page
  //   return true;
   let slug
        let type
        if(state){
          slug=state
        }
        if(city){
          slug=state+'/'+city
        }
        if(center){
          slug=state+'/'+city+'/'+center
        }
        let tbody = {
          slug: slug,
          Projectid: environment.projectid,
        };
   return this.apiService.getGetseo(tbody).pipe(
      map((res: any) => {

        if (res?.data && Object.keys(res.data).length > 0) {
          return true;  // valid → allow route
        } 

        this.router.navigate(['/page-not-found']);
        return false;   // invalid → block route
      }),

      catchError(() => {
        this.router.navigate(['/page-not-found']);
          return of(false);
      })

    );
  }
}
