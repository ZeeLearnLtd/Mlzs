import { Component, ElementRef, EventEmitter, OnInit, Output, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable, Subject, debounceTime, distinctUntilChanged, fromEvent, switchMap } from 'rxjs';
import { ApicallService } from 'src/app/services/apicall.service';
import { HomeSeoService } from 'src/app/services/homeseo.service';
import { ProjectSeoService } from 'src/app/services/projectseo.service';
import { environment } from 'src/environments/environment';
import { NgxSpinnerService } from 'ngx-spinner';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';

@Component({
  selector: 'app-events-details',
  templateUrl: './events-details.component.html',
  styleUrls: ['./events-details.component.css']
})
export class EventsDetailsComponent {
  projectId = environment.projectid

  eventsDetailsData: any;
  img_content: any;
  getParms: any
  constructor(
    private route: ActivatedRoute,
    private seoService: HomeSeoService,
    private projectService: ProjectSeoService,
    private apiService: ApicallService,
    private ngxSpinner: NgxSpinnerService,
    private sanitizer: DomSanitizer,
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
      Type: "events",
      slug: param,
      Projectid: this.projectId
    }
    this.apiService.getBlogsDetails(tbody).subscribe((data: any) => {
      this.eventsDetailsData = data.data
      console.log('eventsDetailsData', this.eventsDetailsData);
    });
  }

  getsanitizehtml(data: any) {
    return this.sanitizer.bypassSecurityTrustHtml(data);
  }

}
