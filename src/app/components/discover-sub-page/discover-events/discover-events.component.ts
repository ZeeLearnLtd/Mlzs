import { Component, OnInit, AfterViewInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable, Subscription, of, switchMap, tap } from 'rxjs';
import { ApicallService } from 'src/app/services/apicall.service';
import { HomeSeoService } from 'src/app/services/homeseo.service';
import { ProjectSeoService } from 'src/app/services/projectseo.service';
import { environment } from 'src/environments/environment';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';

@Component({
  selector: 'app-discover-events',
  templateUrl: './discover-events.component.html',
  styleUrls: ['./discover-events.component.css']
})
export class DiscoverEventsComponent {
  projectId = environment.projectid
  project$: Observable<any> | undefined;
  subscriptionnav!: Subscription;
  testimonydata: any;
  testimonialData: any = [];
  testimonialDataList: any;
  AssignCategory: any = [];
  alldata: any = [];
  selectedcategory: string = "";
  distinctYears: any = [];
  eventsData: any;
  Selectedyear: string = "";
  newsList: any;
  categoryNewsMap: any;
  selectedCategoryId: any;
  constructor(
    private route: ActivatedRoute,
    private seoService: HomeSeoService,
    private projectService: ProjectSeoService,
    private apiService: ApicallService,
    private _service: ApicallService,
    private sanitizer: DomSanitizer
  ) {
  }

  ngOnInit(): void {
    this.getseo()
  }

  getseo() {
    let tbody = {
      slug: 'events',
      Projectid: environment.projectid,
    };
    this.apiService.getGetseo(tbody).subscribe((data: any) => {
      this.getEvents_data();
      this.projectService.sendMessagebread(data.data.breadcrumb);
      this.projectService.sendMessageblog(data?.data?.blog);
      this.projectService.sendMessageseo(data?.data?.testimony);
      this.projectService.sendMessageFaqs(data?.data?.faq);
      this.projectService.setmeta(data?.data);

    });
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
        this.alldata = JSON.parse(res);
        // this.distinctYears = Array.from(
        //   new Set(
        //     this.alldata.map((item: any) => new Date(item.StartDate).getFullYear())
        //   )
        // );
        this.distinctYears = Array.from(
          new Set(
            this.alldata
              .map((item: any) => {
                const date = new Date(item.StartDate);
                return isNaN(date.getTime()) ? null : date.getFullYear();
              })
              .filter((year: any): year is number => year !== null) // remove nulls
          )
        );

      } else {
        this.eventsData = [];
        this.alldata = [];
      }

      if (data?.data[0]?.AssignCategory) {
        this.AssignCategory = JSON.parse(data?.data[0]?.AssignCategory);
        this.prepareCategoryNewsMap();
      } else {
        this.AssignCategory = [];
      }

    });

  }

  onyearchange(id: string) {
    if (id != "") {
      this.categoryNewsMap = this.alldata.filter((dt: any) => {
        return ( //dt.category.includes(id);
          (this.selectedcategory === '' || dt?.category.includes(this.selectedcategory)) &&
          (this.Selectedyear === '' || new Date(dt.StartDate).getFullYear().toString() === this.Selectedyear)
        );
      }).map((obj: any) => {
        return obj;
      });
    }
    else {
      this.categoryNewsMap = this.AssignCategory.map((cat: any) => ({
        ...cat,
        news: this.alldata.filter((news: any) =>
          news.category.split(',').map((c: any) => c.trim()).includes(cat.categoryId.toString())
        )
      }));
    }
  }

  onchangecategory(id: string) {

    this.selectedCategoryId = Number(id);

    this.selectedCategoryId = Number(id);
    if (!this.selectedCategoryId) {
      this.categoryNewsMap = this.AssignCategory.map((cat: any) => ({
        ...cat,
        news: this.alldata.filter((news: any) =>
          (Array.isArray(news.category) && news.category.includes(cat.categoryId)) ||
          (typeof news.category === 'string' && news.category.split(',').map(Number).includes(cat.categoryId)) ||
          (typeof news.category === 'number' && news.category === cat.categoryId)
        )
      }));
    } else {
      this.categoryNewsMap = this.AssignCategory
        .filter((cat: any) => cat.categoryId === this.selectedCategoryId)
        .map((cat: any) => ({
          ...cat,
          news: this.alldata.filter((news: any) =>
            (Array.isArray(news.category) && news.category.includes(cat.categoryId)) ||
            (typeof news.category === 'string' && news.category.split(',').map(Number).includes(cat.categoryId)) ||
            (typeof news.category === 'number' && news.category === cat.categoryId)
          )
        }));

    }

    // if (id != "") {
    //   this.eventsData = this.alldata.filter((dt: any) => {
    //     return (
    //       (this.selectedcategory === '' || dt?.category.includes(this.selectedcategory)) &&
    //       (this.Selectedyear === '' || new Date(dt.StartDate).getFullYear().toString() === this.Selectedyear)
    //     );
    //   }).map((obj: any) => {
    //     return obj;
    //   });
    // }
    // else {
    //   this.eventsData = this.alldata
    // }
  }

  prepareCategoryNewsMap() {
    this.categoryNewsMap = this.AssignCategory.map((cat: any) => ({
      ...cat,
      news: this.alldata.filter((news: any) =>
        news.category.split(',').map((c: any) => c.trim()).includes(cat.categoryId.toString())
      )
    }));
  }
}
