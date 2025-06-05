import { AfterViewInit, Component, Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser, isPlatformServer } from '@angular/common';
import { ApicallService } from 'src/app/services/apicall.service';
import { ProjectSeoService } from 'src/app/services/projectseo.service';
declare var $: any;  // Declare jQuery
@Component({
  selector: 'app-discover-achievements',
  templateUrl: './discover-achievements.component.html',
  styleUrls: ['./discover-achievements.component.css']
})
export class DiscoverAchievementsComponent {

  constructor(
    @Inject(PLATFORM_ID) private platformId: Object,
    private apiService: ApicallService,
    private projectService: ProjectSeoService,) { }

  ngAfterViewInit(): void {

    setTimeout(() => {
      if (isPlatformServer(this.platformId)) {
        var owl = $(".news_owl");
        owl.owlCarousel({
          margin: 10,
          loop: true,
          nav: false,
          center: true,
          responsive: {
            0: {
              items: 1, // On mobile (0px and up), show 1 item
            },
            600: {
              items: 2, // On tablets (600px and up), show 2 items
            },
            1000: {
              items: 3, // On larger screens (1000px and up), show 3 items
            },
          }
        });
      }
    }, 1000)

  }
}
