import { Component, ElementRef, EventEmitter, OnInit, Output, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable, Subject, debounceTime, distinctUntilChanged, fromEvent, switchMap } from 'rxjs';
import { ApicallService } from 'src/app/services/apicall.service';
import { HomeSeoService } from 'src/app/services/homeseo.service';
import { ProjectSeoService } from 'src/app/services/projectseo.service';
import { environment } from 'src/environments/environment';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-news-details',
  templateUrl: './news-details.component.html',
  styleUrls: ['./news-details.component.css']
})
export class NewsDetailsComponent {
  projectId = environment.projectid

  newsDetailsData: any;
  img_content: any;
  getParms: any
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


  getNewsdata(param: string) {
    let tbody = {
      Type: "news",
      slug: param,
      Projectid: this.projectId
    }

    // this.apiService.getBlogsDetails
    this.apiService.getBlogsDetails(tbody).subscribe((data: any) => {
      this.newsDetailsData = data.data
      this.projectService.setmeta(data?.data);
    });
  }

}
