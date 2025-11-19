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
  selector: 'app-our-parents',
  templateUrl: './our-parents.component.html',
  styleUrls: ['./our-parents.component.css']
})
export class OurParentsComponent {
  slides: any[] = [];
  // currentIndex = 1;
  interval: any;

  projectId = environment.projectid;
  alldata: any = [];
  // ParentTestimonial: any = [];
  ParentTestimonial: any = [
    { name: 'Item 1', text: 'This is item 1' },
    { name: 'Item 2', text: 'This is item 2' },
    { name: 'Item 3', text: 'This is item 3' },
    { name: 'Item 4', text: 'This is item 4' },
    { name: 'Item 5', text: 'This is item 5' },
  ];
  visibleSlides = 3;
  currentIndex = 1;

  constructor(
    @Inject(PLATFORM_ID) private platformId: Object,
    private route: ActivatedRoute,
    private seoService: HomeSeoService,
    private projectService: ProjectSeoService,
    private apiService: ApicallService,
    private _service: ApicallService,
    private sanitizer: DomSanitizer
  ) {

  }
  ngOnInit(): void {
    this.gettestimonial_data();
  }
  ngAfterViewInit(): void {
    if (isPlatformBrowser(this.platformId)) {
      setTimeout(() => {
        $('.vertical_carousel').owlCarousel({
          loop: true,
          margin: 10,
          items: 1,
          nav: false,
          animateOut: 'slideOutUp',
          animateIn: 'slideInUp'
        })

      }, 1000)

      if (isPlatformBrowser(this.platformId)) {
        setTimeout(() => {
          var owl = $(".news_owl");
          owl.owlCarousel({
            margin: 10,
            loop: true,
            nav: false,
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
        }, 2000);
      }
    }

  }

  ngOnDestroy(): void {
    clearInterval(this.interval);
  }

  get translateY() {
    const itemHeight = 100; // height of each slide
    const offset = Math.floor(this.visibleSlides / 2);
    return `translateY(${-(this.currentIndex - offset) * itemHeight}px)`;
  }
  selectSlide(index: number) {
    this.currentIndex = index;
  }

  gettestimonial_data() {
    let tbody = {
      Type: "testimonial",
      pageurl: '',
      Project_Id: this.projectId
    };
    this._service.getContentDataList(tbody).subscribe((data: any) => {
      if (data?.data[0]?.contentData) {
        let res = data.data[0].contentData;
        this.alldata = JSON.parse(res);
        this.assigndata();
      } else {
        this.alldata = [];
      }
    });
  }

  assigndata() {
    this.ParentTestimonial = this.alldata.filter((dt: any) => {
      return dt.category.includes(109);         //Parent
    }).map((obj: any) => {
      return {
        ...obj,
        title: obj.Title,
        safeUrl: this.getSafeEmbedUrl(obj.slug)
      };
    });
    //console.log('ParentTestimonial', this.ParentTestimonial);
  }


  //   getSafeEmbedUrl(url: string): SafeResourceUrl {
  //     let videoId = '';

  //     if (url.includes('youtu.be/')) {
  //       videoId = url.split('youtu.be/')[1];
  //     } else if (url.includes('watch?v=')) {
  //       videoId = new URL(url).searchParams.get('v') || '';
  //     } else if (url.includes('embed/')) {
  //       videoId = url.split('embed/')[1];
  //     }

  //     const embedUrl = `https://www.youtube.com/embed/${videoId}`;
  //     return this.sanitizer.bypassSecurityTrustResourceUrl(embedUrl);
  //   }

  getSafeEmbedUrl(url: string | undefined): SafeResourceUrl {
    if (!url || typeof url !== 'string') {
      // return a safe empty URL or some fallback
      return this.sanitizer.bypassSecurityTrustResourceUrl('');
    }

    let videoId = url;

    // if (url.includes('youtu.be/')) {
    //   videoId = url.split('youtu.be/')[1];
    // } else if (url.includes('watch?v=')) {
    //   videoId = new URL(url).searchParams.get('v') || '';
    // } else if (url.includes('embed/')) {
    //   videoId = url.split('embed/')[1];
    // }

    const embedUrl = `https://www.youtube.com/embed/${videoId}`;
    return this.sanitizer.bypassSecurityTrustResourceUrl(embedUrl);
  }

}
