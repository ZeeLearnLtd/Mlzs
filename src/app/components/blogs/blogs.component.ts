import { Component, Inject, OnInit, PLATFORM_ID } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { json } from 'express';
import { Observable, Subscription, of, switchMap, tap } from 'rxjs';
import { ApicallService } from 'src/app/services/apicall.service';
import { HomeSeoService } from 'src/app/services/homeseo.service';
import { ProjectSeoService } from 'src/app/services/projectseo.service';
import { environment } from 'src/environments/environment';
import { isPlatformBrowser } from '@angular/common';
declare var $: any;  // Declare jQuery
@Component({
  selector: 'app-blogs',
  templateUrl: './blogs.component.html',
  styleUrls: ['./blogs.component.css'],
})
export class BlogsComponent implements OnInit {
  projectId = environment.projectid
  project$: Observable<any> | undefined;
  subscriptionnav!: Subscription;
  blogdata: any;
  spinner: boolean = true
  top_blog_img: any;
  top_blog: any;
  constructor(
    @Inject(PLATFORM_ID) private platformId: Object,
    private route: ActivatedRoute,
    private seoService: HomeSeoService,
    private projectService: ProjectSeoService,
    private apiService: ApicallService
  ) {
  }

  ngOnInit(): void {
    // if (isPlatformBrowser(this.platformId)) {
    //   setTimeout(() => {
    //     $('#carousel1').owlCarousel({
    //       items: 1,
    //       margin: 10,
    //       loop: true,
    //       autoplay: false,
    //       nav: false,
    //       dots: true
    //     });
    //   }, 2000);
    // }
    this.subscriptionnav = this.projectService
      .onblogMessage()
      .subscribe((message) => {
        this.spinner = false
        if (message) {
          this.blogdata = message.text;
          console.log('blogdata', this.blogdata);
        }
      });
    this.getblog_data();
  }


  getblog_data() {
    this.subscriptionnav = this.projectService
      .onblogMessage()
      .subscribe((message) => {
        this.spinner = false
        if (message) {
          this.blogdata = message.text;
          this.top_blog_img = this.blogdata[0].files[0].url;
          this.top_blog = this.blogdata[0];
        }
      })
  }
}

