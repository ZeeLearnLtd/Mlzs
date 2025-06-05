import { AfterViewInit, Component, Inject, OnInit, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser, isPlatformServer } from '@angular/common';
import { ApicallService } from 'src/app/services/apicall.service';
import { ProjectSeoService } from 'src/app/services/projectseo.service';
import { environment } from 'src/environments/environment';
declare var $: any;  // Declare jQuery

@Component({
  selector: 'app-mount-litera-expert-connect',
  templateUrl: './mount-litera-expert-connect.component.html',
  styleUrls: ['./mount-litera-expert-connect.component.css']
})
export class MountLiteraExpertConnectComponent {

  constructor(@Inject(PLATFORM_ID) private platformId: Object,
    private apiService: ApicallService,
    private projectService: ProjectSeoService,) { }

  ngOnInit(): void {
    this.getseo();
  }

  ngAfterViewInit(): void {

    setTimeout(() => {
      if (isPlatformServer(this.platformId)) {
        var owl = $(".parent_owl");
        owl.owlCarousel({
          items: 3,
          margin: 25,
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

        var owl = $(".parent_owl");
        owl.owlCarousel({
          items: 3,
          margin: 25,
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

  getseo() {
    let tbody = {
      slug: 'parent-corners/personalized-guidance',
      Projectid: environment.projectid,
    };
    this.apiService.getGetseo(tbody).subscribe((data: any) => {
      this.projectService.sendMessagebread(data.data.breadcrumb);
      this.projectService.sendMessageblog(data?.data?.blog);
      this.projectService.sendMessageseo(data?.data?.testimony);
      this.projectService.sendMessageFaqs(data?.data?.faq);
      // this.projectService.setmeta(data?.data);

    });
  }
}
