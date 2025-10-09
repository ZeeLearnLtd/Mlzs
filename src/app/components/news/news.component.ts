import { Component, Inject, OnInit, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { ApicallService } from 'src/app/services/apicall.service';
import { environment } from 'src/environments/environment';
import { ProjectSeoService } from 'src/app/services/projectseo.service';
declare var $: any;  // Declare jQuery
import { Observable, Subscription, of, switchMap, tap } from 'rxjs';
@Component({
  selector: 'app-news',
  templateUrl: './news.component.html',
  styleUrls: ['./news.component.css']
})
export class NewsComponent implements OnInit {
  projectId = environment.projectid
  headerTitle = "In News"
  subscriptionnav!: Subscription;
  eventsData: any;
  constructor(
    @Inject(PLATFORM_ID) private platformId: Object,
    private _service: ApicallService,
    private projectService: ProjectSeoService,
  ) {

  }

  ngOnInit(): void {
    this.getEvents_data();
  }

  ngAfterViewInit(): void {
    if (isPlatformBrowser(this.platformId)) {
      setTimeout(() => {
        var owl = $(".news_owl");
        owl.owlCarousel({
          margin: 25,
          loop: true,
          nav: false,
          center: true,
          responsive: {
            0: {
              items: 1,
            },
            600: {
              items: 2,
            },
            1000: {
              items: 3,
            },
          }
        });

      }, 1000)
    }

  }
  ngOnDestroy() {
    if (isPlatformBrowser(this.platformId)) {
      const $owl = $('.news_owl');
      if ($owl.hasClass('owl-loaded')) {
        $owl.trigger('destroy.owl.carousel');
      }
    }
  }
  getEvents_data() {
    // let tbody = {
    //   Type: "news",
    //   pageurl: '',
    //   Project_Id: this.projectId
    // };
    // this._service.getContentDataList(tbody).subscribe((data: any) => {
    //   if (data?.data[0]?.contentData) {
    //     let res = data.data[0].contentData
    //     this.eventsData = JSON.parse(res);
    //   }
    // });
    this.subscriptionnav = this.projectService
      .onNewsMessage()
      .subscribe((message) => {
        if (message) {
          this.eventsData = message.text;
        }
      })
  }
}
