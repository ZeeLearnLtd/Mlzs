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
        this.distinctYears = Array.from(
          new Set(
            this.alldata.map((item: any) => new Date(item.CreatedDate).getFullYear())
          )
        );
      } else {
        this.eventsData = [];
        this.alldata = [];
      }

      if (data?.data[0]?.AssignCategory) {
        this.AssignCategory = JSON.parse(data?.data[0]?.AssignCategory);
      } else {
        this.AssignCategory = [];
      }

    });

  }

  onyearchange(id: string) {
    if (id != "") {
      this.eventsData = this.alldata.filter((dt: any) => {
        return ( //dt.category.includes(id);
          (this.selectedcategory === '' || dt?.category.includes(this.selectedcategory)) &&
          (this.Selectedyear === '' || new Date(dt.CreatedDate).getFullYear().toString() === this.Selectedyear)
        );
      }).map((obj: any) => {
        return obj;
      });
    }
    else {
      this.eventsData = this.alldata
    }
  }

  onchangecategory(id: string) {
    if (id != "") {
      this.eventsData = this.alldata.filter((dt: any) => {
        return ( //dt.category.includes(id);
          (this.selectedcategory === '' || dt?.category.includes(this.selectedcategory)) &&
          (this.Selectedyear === '' || new Date(dt.CreatedDate).getFullYear().toString() === this.Selectedyear)
        );
      }).map((obj: any) => {
        return obj;
      });
    }
    else {
      this.eventsData = this.alldata
    }
  }
}
