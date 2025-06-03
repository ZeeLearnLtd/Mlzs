import { AfterViewInit, Component } from '@angular/core';
import { ApicallService } from 'src/app/services/apicall.service';
import { ProjectSeoService } from 'src/app/services/projectseo.service';
import { environment } from 'src/environments/environment';
declare var $: any;  // Declare jQuery
@Component({
  selector: 'app-litera-nova-app',
  templateUrl: './litera-nova-app.component.html',
  styleUrls: ['./litera-nova-app.component.css']
})
export class LiteraNovaAppComponent implements AfterViewInit {

  constructor(private apiService: ApicallService, private projectService: ProjectSeoService,) { }

  onInit(): void {
    this.getseo();
  }

  ngAfterViewInit(): void {
    setTimeout(() => {
      var owl = $(".news_owl");
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
    }, 1000)
  }

  getseo() {
    let tbody = {
      slug: 'academics/nova',
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
