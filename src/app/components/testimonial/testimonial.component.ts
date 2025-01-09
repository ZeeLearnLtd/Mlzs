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
      items: 4,
      margin: 10,
      loop: true,
      nav: false
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
