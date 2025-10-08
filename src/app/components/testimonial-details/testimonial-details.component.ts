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
  selector: 'app-testimonial-details',
  templateUrl: './testimonial-details.component.html',
  styleUrls: ['./testimonial-details.component.css']
})
export class TestimonialDetailsComponent {
  projectId = environment.projectid

  eventsDetailsData: any;
  img_content: any;
  getParms: any
  testimonialsDetailsData: any;
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
      Type: "testimonials",
      slug: param,
      Projectid: this.projectId
    }
    this.apiService.getBlogsDetails(tbody).subscribe((data: any) => {
      this.testimonialsDetailsData = data.data;
      this.projectService.setmeta(data?.data);
    });
  }
}
