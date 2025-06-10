import { Component, Inject, OnInit, PLATFORM_ID } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProjectSeoService } from 'src/app/services/projectseo.service';
import { environment } from 'src/environments/environment';
import { ApicallService } from 'src/app/services/apicall.service';
import { isPlatformBrowser } from '@angular/common';

declare var $: any;  // Declare jQuery
@Component({
  selector: 'app-programmes',
  templateUrl: './programmes.component.html',
  styleUrls: ['./programmes.component.css']
})
export class ProgrammesComponent implements OnInit {
  segment: any

  constructor(
    @Inject(PLATFORM_ID) private platformId: Object,
    private _activeRoute: ActivatedRoute,
    private projectService: ProjectSeoService,
    private apiService: ApicallService,
    private activatedRoute: ActivatedRoute) { }

  ngAfterViewInit(): void {
    if (isPlatformBrowser(this.platformId)) {
      setTimeout(() => {
        $('#carousel2').owlCarousel({
          items: 1,
          margin: 20,
          loop: true,
          autoplay: true,
          autoplayTimeout: 2500,
          nav: false,
          dots: true
        });
      }, 2000)
    }
  }

  ngOnInit(): void {
    const urlSegments = this.activatedRoute.snapshot.url;
    this.segment = urlSegments[0]?.path;
  }

}
