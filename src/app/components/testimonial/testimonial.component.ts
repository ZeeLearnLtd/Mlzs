import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable, Subscription, of, switchMap, tap } from 'rxjs';
import { ApicallService } from 'src/app/services/apicall.service';
import { HomeSeoService } from 'src/app/services/homeseo.service';
import { ProjectSeoService } from 'src/app/services/projectseo.service';
import { environment } from 'src/environments/environment';
declare var $: any;  // Declare jQuery
@Component({
  selector: 'app-testimonial',
  templateUrl: './testimonial.component.html',
  styleUrls: ['./testimonial.component.css'],
})
export class TestimonialComponent implements OnInit {
  project$: Observable<any> | undefined;
  subscriptionnav!: Subscription;
  testimonydata: any;
  constructor(
    private route: ActivatedRoute,
    private seoService: HomeSeoService,
    private projectService: ProjectSeoService,
    private apiService: ApicallService
  ) {
    //
  }

  ngAfterViewInit(): void {
    setTimeout(()=>{
      var owl = $(".news_owl");
    owl.owlCarousel({
      items: 3,
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
    },1000)
  
  }
  ngOnInit(): void {
    // this.subscriptionnav = this.projectService
    //   .onseoMessage()
    //   .subscribe((message) => {
    //     if (message) {
    //       this.testimonydata = message.text;
       
    //     }
    //   });
  }
}
