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
  selector: 'app-discover-testimonials',
  templateUrl: './discover-testimonials.component.html',
  styleUrls: ['./discover-testimonials.component.css']
})
export class DiscoverTestimonialsComponent {

  projectId = environment.projectid
  project$: Observable<any> | undefined;
  subscriptionnav!: Subscription;
  testimonydata: any;
  testimonialData: any = [];
  testimonialDataList: any;
  AssignCategory: any = [];
  alldata: any = [];
  SchoolTestimnoal: any = [];
  StudentTestimonial: any = [];
  ParentTestimonial: any = [];
  selectedcategory: string = "";
  originalSchoolTestimonial: any = [];
  originalStudentTestimonial: any = [];
  originalParentTestimonial: any = [];
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
    this.getseo()
  }


  ngAfterViewInit(): void {
    if (isPlatformBrowser(this.platformId)) {
      setTimeout(() => {
        var owl = $(".news_owl");
        owl.owlCarousel({
          margin: 10,
          loop: true,
          nav: false,
          dots: true,
          center: true,
          responsive: {
            0: {
              items: 1, // On mobile (0px and up), show 1 item
            },
            600: {
              items: 2, // On tablets (600px and up), show 2 items
            },
            1000: {
              items: 3, // On larger screens (1000px and up), show 3 items
            },
          }
        });
      }, 2000);
    }
  }

  getseo() {
    let tbody = {
      slug: 'testimonial',
      Projectid: environment.projectid,
    };
    this.apiService.getGetseo(tbody).subscribe((data: any) => {
      this.gettestimonial_data();
      this.projectService.sendMessagebread(data.data.breadcrumb);
      this.projectService.sendMessageblog(data?.data?.blog);
      this.projectService.sendMessageseo(data?.data?.testimony);
      this.projectService.sendMessageFaqs(data?.data?.faq);
      this.projectService.setmeta(data?.data);

    });
  }
  gettestimonial_data() {
    let tbody = {
      Type: "testimonial",
      pageurl: '',
      Project_Id: this.projectId
    };
    this._service.getContentDataList(tbody).subscribe((data: any) => {
      if (data?.data[0]?.contentData) {
        let res = data.data[0].contentData
        this.testimonialData = JSON.parse(res);
        this.alldata = JSON.parse(res);
        this.assigndata();
        //  this.testimonialDataList = this.testimonialData.map((video: any) => ({
        //     title: video.Title,
        //     safeUrl: this.getSafeEmbedUrl(video.slug)
        //  }));
      } else {
        this.testimonialData = [];
      }

      if (data?.data[0]?.AssignCategory) {
        this.AssignCategory = JSON.parse(data?.data[0]?.AssignCategory);
      } else {
        this.AssignCategory = [];
      }
    });
  }

  onSearchChange(event: Event) {
    // const value = (event.target as HTMLInputElement).value;
    // this.SchoolTestimnoal = this.SchoolTestimnoal.filter((item: any) =>
    //   item?.Title?.toLowerCase().includes(value?.toLowerCase()) && item.category.includes(107)
    // );
    // this.StudentTestimonial = this.StudentTestimonial.filter((item: any) =>
    //   item?.Title?.toLowerCase().includes(value?.toLowerCase()) && item.category.includes(108)
    // );
    // this.ParentTestimonial = this.ParentTestimonial.filter((item: any) =>
    //   item?.Title?.toLowerCase().includes(value?.toLowerCase()) && item.category.includes(109)
    // );

    const value = (event.target as HTMLInputElement).value.toLowerCase();

    if (!value) {
      console.log('[...this.originalSchoolTestimonial]', [...this.originalSchoolTestimonial])
      console.log('[...this.originalStudentTestimonial]', [...this.originalStudentTestimonial])
      console.log('[...this.originalParentTestimonial]', [...this.originalParentTestimonial])
      this.SchoolTestimnoal = [...this.originalSchoolTestimonial];
      this.StudentTestimonial = [...this.originalStudentTestimonial];
      this.ParentTestimonial = [...this.originalParentTestimonial];
    }

    this.SchoolTestimnoal = this.originalSchoolTestimonial.filter((item: any) =>
      item?.Title?.toLowerCase().includes(value) && item.category.includes(107)
    );

    this.StudentTestimonial = this.originalStudentTestimonial.filter((item: any) =>
      item?.Title?.toLowerCase().includes(value) && item.category.includes(108)
    );

    this.ParentTestimonial = this.originalParentTestimonial.filter((item: any) =>
      item?.Title?.toLowerCase().includes(value) && item.category.includes(109)
    );
  }

  assigndata() {
    this.SchoolTestimnoal = this.alldata.filter((dt: any) => {
      return dt.category.includes(107);         //School
    }).map((obj: any) => {
      return {
        ...obj,
        title: obj.Title,
        safeUrl: this.getSafeEmbedUrl(obj.slug),

      };
    });

    this.StudentTestimonial = this.alldata.filter((dt: any) => {
      return dt.category.includes(108);         //Student
    }).map((obj: any) => {
      return {
        ...obj,
        title: obj.Title,
        safeUrl: this.getSafeEmbedUrl(obj.slug),

      };
    });

    this.ParentTestimonial = this.alldata.filter((dt: any) => {
      return dt.category.includes(109);         //Parent
    }).map((obj: any) => {
      return {
        ...obj,
        title: obj.Title,
        safeUrl: this.getSafeEmbedUrl(obj?.slug),

      };
    });

    this.originalSchoolTestimonial = [...this.SchoolTestimnoal];
    this.originalStudentTestimonial = [...this.StudentTestimonial];
    this.originalParentTestimonial = [...this.ParentTestimonial];
  }


  getSafeEmbedUrl(url: string): SafeResourceUrl {
    let videoId = url;
    // if (url == undefined) {
    //   return ''
    // }
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

  onchangecategory(id: string) {
    if (id != "") {
      this.testimonydata = this.alldata.filter((dt: any) => {
        return dt.category.includes(id);
      }).map((obj: any) => {
        return obj;
      });
    }
    else {
      this.testimonydata = this.alldata;
    }

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
              items: 1, // On mobile (0px and up), show 1 item
            },
            600: {
              items: 2, // On tablets (600px and up), show 2 items
            },
            1000: {
              items: 3, // On larger screens (1000px and up), show 3 items
            },
          }
        });
      }, 2000);
    }
  }
}
