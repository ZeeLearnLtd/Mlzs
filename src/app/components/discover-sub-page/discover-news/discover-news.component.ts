import { Component, OnInit, AfterViewInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable, Subscription, of, switchMap, tap } from 'rxjs';
import { ApicallService } from 'src/app/services/apicall.service';
import { HomeSeoService } from 'src/app/services/homeseo.service';
import { ProjectSeoService } from 'src/app/services/projectseo.service';
import { environment } from 'src/environments/environment';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { json } from 'express';

@Component({
  selector: 'app-discover-news',
  templateUrl: './discover-news.component.html',
  styleUrls: ['./discover-news.component.css']
})
export class DiscoverNewsComponent {
  projectId = environment.projectid
  project$: Observable<any> | undefined;
  subscriptionnav!: Subscription;
  testimonydata: any;
  testimonialData: any = [];
  testimonialDataList: any;
  newsData: any;
  alldata: any = [];
  category_name: string = "All Category";
  newscategory: any = [];
  distinctKeywards: any = [];
  distinctYears: any = [];
  Selectedpublisher: string = "";
  Selectedyear: string = "";
  Selectedcategory: string = "";
  constructor(
    private route: ActivatedRoute,
    private seoService: HomeSeoService,
    private projectService: ProjectSeoService,
    private apiService: ApicallService,
    private _service: ApicallService,
    private sanitizer: DomSanitizer
  ) {
    //
  }


  ngOnInit(): void {
    this.getseo()

  }

  getseo() {
    let tbody = {
      slug: 'news',
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
      Type: "news",
      pageurl: '',
      Project_Id: this.projectId
    };
    this._service.getContentDataList(tbody).subscribe((data: any) => {
      if (data?.data[0]?.contentData) {
        let res = data.data[0].contentData
        this.newsData = JSON.parse(res);
        console.log('newsData', this.newsData)
        this.alldata = JSON.parse(res);
        this.distinctYears = Array.from(
          new Set(
            this.alldata.map((item: any) => new Date(item.CreatedDate).getFullYear())
          )
        );
        this.distinctKeywards = Array.from(
          new Set(
            this.alldata.map((item: any) => item.Keywards))
        )
      } else {
        this.newsData = [];
      }
      if (data?.data[0]?.AssignCategory) {
        this.newscategory = JSON.parse(data?.data[0]?.AssignCategory)
      } else {
        this.newscategory = [];
      }
    });
    console.log('this.distinctKeywards', this.distinctKeywards)
  }



  onchangecategory(id: string) {
    if (id != "") {
      this.newsData = this.alldata.filter((dt: any) => {
        return ( //dt.category.includes(id);
          (this.Selectedcategory === '' || dt?.category.includes(this.Selectedcategory)) &&
          (this.Selectedyear === '' || new Date(dt.CreatedDate).getFullYear().toString() === this.Selectedyear) &&
          (this.Selectedpublisher === '' || dt?.Keywards.includes(this.Selectedpublisher))
        );
      }).map((obj: any) => {
        return obj;
      });
    }
    else {
      this.newsData = this.alldata
    }

  }
  onpublisherchange(id: string) {
    if (id != "") {
      this.newsData = this.alldata.filter((dt: any) => {
        return ( //dt.category.includes(id);
          (this.Selectedcategory === '' || dt?.category.includes(this.Selectedcategory)) &&
          (this.Selectedyear === '' || new Date(dt.CreatedDate).getFullYear().toString() === this.Selectedyear) &&
          (this.Selectedpublisher === '' || dt?.Keywards.includes(this.Selectedpublisher))
        );
      }).map((obj: any) => {
        return obj;
      });
    }
    else {
      this.newsData = this.alldata
    }
  }

  onyearchange(id: string) {
    if (id != "") {
      this.newsData = this.alldata.filter((dt: any) => {
        return ( //dt.category.includes(id);
          (this.Selectedcategory === '' || dt?.category.includes(this.Selectedcategory)) &&
          (this.Selectedyear === '' || new Date(dt.CreatedDate).getFullYear().toString() === this.Selectedyear) &&
          (this.Selectedpublisher === '' || dt?.Keywards.includes(this.Selectedpublisher))
        );
      }).map((obj: any) => {
        return obj;
      });
    }
    else {
      this.newsData = this.alldata
    }
  }
}
