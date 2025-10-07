import { Component, ElementRef, EventEmitter, OnInit, Output, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable, Subject, debounceTime, distinctUntilChanged, fromEvent, switchMap } from 'rxjs';
import { ApicallService } from 'src/app/services/apicall.service';
import { HomeSeoService } from 'src/app/services/homeseo.service';
import { ProjectSeoService } from 'src/app/services/projectseo.service';
import { environment } from 'src/environments/environment';
import { NgxSpinnerService } from 'ngx-spinner';
@Component({
  selector: 'app-blog-details',
  templateUrl: './blog-details.component.html',
  styleUrls: ['./blog-details.component.css'],
})
export class BlogDetailsComponent implements OnInit {
  projectId = environment.projectid
  tindex: number = 10;
  totalrecord: number = 0;
  findex: number = 0;
  more: boolean = true;
  blogdetails: any;
  filteredblogList: any;
  selectedindex!: any;
  selectedcategory: number = 0;
  blogList: any;
  categorydata: any = [];
  ucenterList: any;
  input = new Subject<string>();
  getParms: any;
  blog_detailsData: any;
  img_content: any;
  constructor(
    private route: ActivatedRoute,
    private seoService: HomeSeoService,
    private projectService: ProjectSeoService,
    private apiService: ApicallService,
    private ngxSpinner: NgxSpinnerService,
  ) {

  }
  ngOnInit(): void {
    this.route.params.subscribe((params: any) => {
      this.getParms = params['name']
      this.getNewsdata(params['name']);
    })
  }

  getseo() {
    let tbody = {
      slug: 'blogs',
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
  getNewsdata(param: string) {
    this.getseo();
    let tbody = {
      Type: "blogs",
      slug: param,
      Projectid: environment.projectid  //this.projectId
    }
    // this.apiService.getBlogsDetails
    this.apiService.getBlogsDetails(tbody).subscribe((data: any) => {
      this.blog_detailsData = data.data
    });
  }

}