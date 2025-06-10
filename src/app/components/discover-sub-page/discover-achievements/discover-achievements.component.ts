import { AfterViewInit, Component, Inject, OnInit, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { ApicallService } from 'src/app/services/apicall.service';
import { ProjectSeoService } from 'src/app/services/projectseo.service';
import { ActivatedRoute } from '@angular/router';
import { Observable, Subscription, of, switchMap, tap } from 'rxjs';
import { HomeSeoService } from 'src/app/services/homeseo.service';
import { environment } from 'src/environments/environment';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';

declare var $: any;  // Declare jQuery
@Component({
  selector: 'app-discover-achievements',
  templateUrl: './discover-achievements.component.html',
  styleUrls: ['./discover-achievements.component.css']
})
export class DiscoverAchievementsComponent implements OnInit, AfterViewInit {

  projectId = environment.projectid
  project$: Observable<any> | undefined;
  subscriptionnav!: Subscription;
  achievementData: any;


  constructor(
    @Inject(PLATFORM_ID) private platformId: Object,
    private apiService: ApicallService,
    private projectService: ProjectSeoService,
    private route: ActivatedRoute,
    private seoService: HomeSeoService,
    private _service: ApicallService,
    private sanitizer: DomSanitizer
  ) { }

  ngOnInit(): void {
    this.getseo()
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

      }, 1000)
    }
  }

  getseo() {
    let tbody = {
      slug: 'achievement',
      Projectid: environment.projectid,
    };
    this.apiService.getGetseo(tbody).subscribe((data: any) => {
      this.getnews_data();
      this.projectService.sendMessagebread(data.data.breadcrumb);
      this.projectService.sendMessageblog(data?.data?.blog);
      this.projectService.sendMessageseo(data?.data?.testimony);
      this.projectService.sendMessageFaqs(data?.data?.faq);
      this.projectService.setmeta(data?.data);

    });
  }
  getnews_data() {
    let tbody = {
      Type: "achievement",
      pageurl: '',
      Project_Id: this.projectId
    };
    this._service.getContentDataList(tbody).subscribe((data: any) => {
      let res = data.data[0].contentData
      this.achievementData = JSON.parse(res);
      console.log('achievementData', this.achievementData)
    });

  }

}
