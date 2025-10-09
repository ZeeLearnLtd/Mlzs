import { Component, Inject, PLATFORM_ID } from '@angular/core';
import { ApicallService } from 'src/app/services/apicall.service';
import { ProjectSeoService } from 'src/app/services/projectseo.service';
import { environment } from 'src/environments/environment';
import { isPlatformBrowser } from '@angular/common';
declare var $: any;  // Declare jQuery

@Component({
  selector: 'app-parents-testimonials',
  templateUrl: './parents-testimonials.component.html',
  styleUrls: ['./parents-testimonials.component.css']
})
export class ParentsTestimonialsComponent {


  constructor(@Inject(PLATFORM_ID) private platformId: Object, private apiService: ApicallService, private projectService: ProjectSeoService,) { }

  ngOnInit(): void {
    this.getseo();
  }


  ngAfterViewInit(): void {
    if (isPlatformBrowser(this.platformId)) {
      setTimeout(() => {
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
      }, 4000)
    }

  }

  getseo() {
    let tbody = {
      slug: 'parents-corner/parents-testimonials',
      Projectid: environment.projectid,
    };
    this.apiService.getGetseo(tbody).subscribe((data: any) => {
      this.projectService.sendMessagebread(data.data.breadcrumb);
      this.projectService.sendMessageblog(data?.data?.blog);
      this.projectService.sendMessageseo(data?.data?.testimony);
      this.projectService.sendMessageFaqs(data?.data?.faq);
      this.projectService.setmeta(data?.data);

    });
  }

}
