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
    projectId = environment.projectid;
    alldata:any=[];
    ParentTestimonial:any=[];
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

  gettestimonial_data() {
    let tbody = {
      Type: "testimonial",
      pageurl: '',
      Project_Id: this.projectId
    };
    this._service.getContentDataList(tbody).subscribe((data: any) => {
      if(data?.data[0]?.contentData){
         let res = data.data[0].contentData;        
         this.alldata = JSON.parse(res);
         this.assigndata();       
      }else{
         this.alldata=[];
      }
    });
  }

  assigndata(){   
    this.ParentTestimonial= this.alldata.filter((dt:any)=>{
        return dt.category.includes(109);         //Parent
    }).map((obj:any)=>{
         return {...obj,
            title: obj.Title,
            safeUrl: this.getSafeEmbedUrl(obj.slug)
         };
    });
  }


   getSafeEmbedUrl(url: string): SafeResourceUrl {
    let videoId = '';

    if (url.includes('youtu.be/')) {
      videoId = url.split('youtu.be/')[1];
    } else if (url.includes('watch?v=')) {
      videoId = new URL(url).searchParams.get('v') || '';
    } else if (url.includes('embed/')) {
      videoId = url.split('embed/')[1];
    }

    const embedUrl = `https://www.youtube.com/embed/${videoId}`;
    return this.sanitizer.bypassSecurityTrustResourceUrl(embedUrl);
  }

}
