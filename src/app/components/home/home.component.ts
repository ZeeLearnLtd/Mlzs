import { Component, Inject, OnInit, PLATFORM_ID } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable, of, switchMap, tap, Subscription } from 'rxjs';
import { ApicallService } from 'src/app/services/apicall.service';
import { HomeSeoService } from 'src/app/services/homeseo.service';
import { ProjectSeoService } from 'src/app/services/projectseo.service';
import { environment } from 'src/environments/environment';
import { NgxSpinnerService } from 'ngx-spinner';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { isPlatformBrowser } from '@angular/common';
declare var $: any;  // Declare jQuery
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  projectId = environment.projectid
  project$: Observable<any> | undefined;
  subProfileInfo: any;
  subscriptionnav!: Subscription;
  testimonydata: any = [];
  profile_title: any;
  bannerList: any;

  constructor(
    @Inject(PLATFORM_ID) private platformId: Object,
    private sanitizer: DomSanitizer,
    private route: ActivatedRoute,
    private seoService: HomeSeoService,
    private projectService: ProjectSeoService,
    private apiService: ApicallService,
    private ngxSpinner: NgxSpinnerService,
    private fb: FormBuilder
  ) {

  }

  ngOnInit(): void {
    if (isPlatformBrowser(this.platformId)) {
      this.getseo();
    }


  }
  ngAfterViewInit(): void {
    if (isPlatformBrowser(this.platformId)) {
      setTimeout(() => {
        var owl = $(".count_owl");
        owl.owlCarousel({
          margin: 10,
          loop: true,
          nav: false,
          center: true,
          responsive: {
            0: {
              items: 3,
            },
            600: {
              items: 3,
            },
            1000: {
              items: 3,
            },
          }
        });
      }, 1000)
    }
  }


  ngOnDestroy() {
    if (isPlatformBrowser(this.platformId)) {
      const $owl = $('.count_owl');
      if ($owl.hasClass('owl-loaded')) {
        $owl.trigger('destroy.owl.carousel');
      }
    }
  }

  sanitizeUrl(url: string): SafeUrl {
    return this.sanitizer.bypassSecurityTrustUrl(url);
  }

  getBanner() {
    let tbody = {
      Type: "banner",
      pageurl: '',
      Project_Id: this.projectId
    };
    this.apiService.getContentDataList(tbody).subscribe((data: any) => {
      let bannerData = data.data[0].contentData
      this.bannerList = JSON.parse(bannerData)
    })
  }

  getseo() {
    let tbody = {
      slug: 'home',
      Projectid: environment.projectid,
    };
    this.apiService.getGetseo(tbody).subscribe((data: any) => {
      if (isPlatformBrowser(this.platformId)) {
        this.getBanner()
        this.projectService.sendMessagebread(data.data.breadcrumb);
        this.projectService.sendMessageblog(data?.data?.blog);
        this.projectService.sendMessageseo(data?.data?.testimony);
        this.projectService.sendMessageFaqs(data?.data?.faq);
        this.projectService.sendMessageNews(data?.data?.news);
        this.projectService.setmeta(data?.data);
      }
    });
  }
}
