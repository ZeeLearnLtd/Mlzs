import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable, Subscription, of, switchMap, tap } from 'rxjs';
import { ApicallService } from 'src/app/services/apicall.service';
import { HomeSeoService } from 'src/app/services/homeseo.service';
import { ProjectSeoService } from 'src/app/services/projectseo.service';
import { environment } from 'src/environments/environment';
declare var $: any;  // Declare jQuery
@Component({
  selector: 'app-blogs',
  templateUrl: './blogs.component.html',
  styleUrls: ['./blogs.component.css'],
})
export class BlogsComponent implements OnInit {
  project$: Observable<any> | undefined;
  subscriptionnav!: Subscription;
  blogdata: any;
  spinner: boolean = true
  top_blog: any;
  top_blog_img: any;
  constructor(
    private route: ActivatedRoute,
    private seoService: HomeSeoService,
    private projectService: ProjectSeoService,
    private apiService: ApicallService
  ) {
  }

  ngOnInit(): void {
    setTimeout(() => {
      $('#carousel1').owlCarousel({
        items: 1, // Number of items to show
        margin: 10,
        loop: true,
        autoplay: false,
        // autoplayTimeout: 2000,
        nav: false,
        dots: true
      });
    }, 2000);

    this.subscriptionnav = this.projectService
      .onblogMessage()
      .subscribe((message) => {
        this.spinner = false
        if (message) {
          this.blogdata = message.text;
          this.top_blog = this.blogdata[0]
          this.top_blog_img = this.top_blog.files[0]
        }
      });
  }

}
