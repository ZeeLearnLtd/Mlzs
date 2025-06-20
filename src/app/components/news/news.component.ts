import { Component, Inject, OnInit, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { ApicallService } from 'src/app/services/apicall.service';
import { environment } from 'src/environments/environment';
declare var $: any;  // Declare jQuery

@Component({
  selector: 'app-news',
  templateUrl: './news.component.html',
  styleUrls: ['./news.component.css']
})
export class NewsComponent implements OnInit {
  projectId = environment.projectid
  headerTitle = "In News"
  eventsData: any;
  constructor(
    @Inject(PLATFORM_ID) private platformId: Object,
    private _service: ApicallService,
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

  getEvents_data() {
    let tbody = {
      Type: "events",
      pageurl: '',
      Project_Id: this.projectId
    };
    this._service.getContentDataList(tbody).subscribe((data: any) => {
      if (data?.data[0]?.contentData) {
        let res = data.data[0].contentData
        this.eventsData = JSON.parse(res);
      }
    });

  }
}
