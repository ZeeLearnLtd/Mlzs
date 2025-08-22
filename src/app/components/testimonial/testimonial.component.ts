import { Component, OnInit, AfterViewInit, PLATFORM_ID, Inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable, Subscription, of, switchMap, tap } from 'rxjs';
import { ApicallService } from 'src/app/services/apicall.service';
import { HomeSeoService } from 'src/app/services/homeseo.service';
import { ProjectSeoService } from 'src/app/services/projectseo.service';
import { environment } from 'src/environments/environment';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { isPlatformBrowser } from '@angular/common';
declare var $: any;  // Declare jQuery
@Component({
  selector: 'app-testimonial',
  templateUrl: './testimonial.component.html',
  styleUrls: ['./testimonial.component.css'],
})
export class TestimonialComponent implements AfterViewInit, OnInit {
  projectId = environment.projectid
  project$: Observable<any> | undefined;
  subscriptionnav!: Subscription;
  testimonydata: any;
  testimonialData: any = [];
  testimonialDataList: any = [];
  constructor(
    @Inject(PLATFORM_ID) private platformId: Object,
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

  }
  ngAfterViewInit(): void {
    if (isPlatformBrowser(this.platformId)) {
      setTimeout(() => {
        var owl = $(".news_owl");
        owl.owlCarousel({
          items: 3,
          margin: 25,
          loop: true,
          nav: false,
          dots: true,
          center: true,
          responsive: {
            0: {
              items: 1,
            },
            600: {
              items: 2,
            },
            1000: {
              items: 3,
            },
          }
        });
      }, 1000)
    }
    this.gettestimonial_data();
  }



  gettestimonial_data() {
    this.subscriptionnav = this.projectService
      .onseoMessage()
      .subscribe((message) => {
        if (message) {
          this.testimonialData = message.text
        }
        this.testimonialDataList = this.testimonialData.map((video: any) => ({
          ...video,
          title: video.Title,
          safeUrl: this.getSafeEmbedUrl(video.slug),
        }));
      });
  }


  getSafeEmbedUrl(url: string): SafeResourceUrl {
    let videoId = url;
    if (url) {
      // if (url.includes('youtu.be/')) {
      //   videoId = url.split('youtu.be/')[1];
      // } else if (url.includes('watch?v=')) {
      //   videoId = new URL(url).searchParams.get('v') || '';
      // } else if (url.includes('embed/')) {
      //   videoId = url.split('embed/')[1];
      // }

      const embedUrl = `https://www.youtube.com/embed/${videoId}`;
      return this.sanitizer.bypassSecurityTrustResourceUrl(embedUrl);
    } else {
      return ''
    }

  }

}
