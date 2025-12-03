// import { ResolveFn } from '@angular/router';

// export const locationResolver: ResolveFn<boolean> = (route, state) => {
//   return true;
// };

import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, Router } from '@angular/router';

@Injectable({ providedIn: 'root' })
export class LocationResolver implements Resolve<boolean> {

  constructor(private router: Router) {}

  // Allowed states and cities
  states: { [key: string]: string[] } = {
    'tamil-nadu': ['madurai', 'chennai', 'salem'],
    'kerala': ['kochi', 'trivandrum'],
    'karnataka': ['bangalore', 'mysore'],
    'bihar':['patna'],
  };

  resolve(route: ActivatedRouteSnapshot): boolean {
    const state = route.paramMap.get('state')?.toLowerCase();
    const city = route.paramMap.get('city')?.toLowerCase();

   if (!state || !this.states[state]) {
      this.router.navigate(['/page-not-found']);
      return false;
    }

    // Validate city exists for the state
    if (city && (!this.states[state].includes(city))) {
      this.router.navigate(['/page-not-found']);
      return false;
    }

    // Invalid → go to 404 page
    return true;
  }
}
