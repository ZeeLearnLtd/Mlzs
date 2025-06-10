import { Component, Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
declare var $: any;  // Declare jQuery
@Component({
  selector: 'app-our-parents',
  templateUrl: './our-parents.component.html',
  styleUrls: ['./our-parents.component.css']
})
export class OurParentsComponent {
  constructor(
    @Inject(PLATFORM_ID) private platformId: Object,
  ) {

  }

  ngAfterViewInit(): void {
    if (isPlatformBrowser(this.platformId)) {
      setTimeout(() => {
        $('.vertical_carousel').owlCarousel({
          loop: true,
          margin: 10,
          items: 1,
          nav: false,
          animateOut: 'slideOutUp',
          animateIn: 'slideInUp'
        })

      }, 1000)
    }

  }
}
