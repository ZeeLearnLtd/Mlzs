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
  alldata: any = [];
  Studentachievement: any = [];
  Teacherachievement: any = [];
  Schoolachievement: any = [];
  AssignCategory: any = [];
  selectedcategory: string = "";
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
          loop: true,
          margin: 10,
          nav: false,       // previous/next arrows
          dots: true,
          center: true,   // show dots
          autoplay: true,
          autoplayTimeout: 5000,
          responsive: {
            0: { items: 1 },
            600: { items: 2 },
            1000: { items: 3 }
          }
        });

      }, 1000)
    }
  }

  getseo() {
    let tbody = {
      slug: 'achievements',
      Projectid: environment.projectid,
    };
    this.apiService.getGetseo(tbody).subscribe((data: any) => {
      this.getnews_data();
      this.projectService.sendMessagebread(data?.data?.breadcrumb);
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
      if (data?.data[0]?.contentData) {
        let res = data.data[0].contentData
        this.achievementData = JSON.parse(res);
        this.alldata = JSON.parse(res);
        this.assigndata();
      }
      else {
        this.achievementData = [];
        this.alldata = [];
      }

      if (data?.data[0]?.AssignCategory) {
        this.AssignCategory = JSON.parse(data?.data[0]?.AssignCategory);
      } else {
        this.AssignCategory = [];
      }
    });

  }


  onSearchChange(event: Event) {
    const value = (event.target as HTMLInputElement).value;
    if (value) {
      this.Schoolachievement = this.alldata.filter((item: any) =>
        item?.Title?.toLowerCase().includes(value?.toLowerCase()) && item.category.includes(104)
      );
      this.Teacherachievement = this.alldata.filter((item: any) =>
        item?.Title?.toLowerCase().includes(value?.toLowerCase()) && item.category.includes(105)
      );
      this.Studentachievement = this.alldata.filter((item: any) =>
        item?.Title?.toLowerCase().includes(value?.toLowerCase()) && item.category.includes(106)
      );

    } else {
      this.assigndata();
    }

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

  assigndata() {
    this.Schoolachievement = this.alldata.filter((dt: any) => {
      return dt.category.includes(104);         //School
    }).map((obj: any) => {
      return obj;
    });
    console.log('Schoolachievement', this.Schoolachievement);
    this.Teacherachievement = this.alldata.filter((dt: any) => {
      return dt.category.includes(105);         //Teacher
    }).map((obj: any) => {
      return obj;
    });
    console.log('Teacherachievement', this.Teacherachievement);
    this.Studentachievement = this.alldata.filter((dt: any) => {
      return dt.category.includes(106);         //Student
    }).map((obj: any) => {
      return obj;
    });
    console.log('Studentachievement', this.Studentachievement);

  }

  onchangecategory(id: string) {
    if (id != "") {
      this.achievementData = this.alldata.filter((dt: any) => {
        return dt.category.includes(id);
      }).map((obj: any) => {
        return obj;
      });
    }
    else {
      this.achievementData = this.alldata;
    }

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
      }, 2000);
    }
  }

}
