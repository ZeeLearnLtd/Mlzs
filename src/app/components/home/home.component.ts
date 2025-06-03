import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable, of, switchMap, tap, Subscription } from 'rxjs';
import { ApicallService } from 'src/app/services/apicall.service';
import { HomeSeoService } from 'src/app/services/homeseo.service';
import { ProjectSeoService } from 'src/app/services/projectseo.service';
import { environment } from 'src/environments/environment';
import { NgxSpinnerService } from 'ngx-spinner';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
declare var $: any;  // Declare jQuery
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  project$: Observable<any> | undefined;
  subProfileInfo: any;
  subscriptionnav!: Subscription;
  testimonydata: any = [];
  profile_title: any;

  constructor(
    private sanitizer: DomSanitizer,
    private route: ActivatedRoute,
    private seoService: HomeSeoService,
    private projectService: ProjectSeoService,
    private apiService: ApicallService,
    private ngxSpinner: NgxSpinnerService,
    private fb: FormBuilder
  ) {

  }


  ngAfterViewInit(): void {
    setTimeout(() => {
      var owl = $(".count_owl");
      owl.owlCarousel({
        margin: 10,
        loop: true,
        nav: false,
        center: true,
        responsive: {
          0: {
            items: 3, // On mobile (0px and up), show 1 item
          },
          600: {
            items: 3, // On tablets (600px and up), show 2 items
          },
          1000: {
            items: 3, // On larger screens (1000px and up), show 3 items
          },
        }
      });
    }, 1000)
  }

  sanitizeUrl(url: string): SafeUrl {
    return this.sanitizer.bypassSecurityTrustUrl(url);
  }
  ngOnInit(): void {
    this.getseo();
  }

  getseo() {
    let tbody = {
      slug: 'home',
      Projectid: environment.projectid,
    };
    this.apiService.getGetseo(tbody).subscribe((data: any) => {
      this.projectService.sendMessagebread(data.data.breadcrumb);
      this.projectService.sendMessageblog(data?.data?.blog);
      this.projectService.sendMessageseo(data?.data?.testimony);
      this.projectService.sendMessageFaqs(data?.data?.faq);
      // this.projectService.setmeta(data?.data);

    });
  }
}
