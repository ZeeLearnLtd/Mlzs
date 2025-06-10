import { Component, Inject, OnInit, PLATFORM_ID } from "@angular/core";
import { ActivatedRoute, Router, NavigationStart, NavigationEnd } from "@angular/router";
import { Location, PopStateEvent } from "@angular/common";
import { ApicallService } from "./services/apicall.service";
import { environment } from "src/environments/environment";
import { ProjectSeoService } from 'src/app/services/projectseo.service';
import { isPlatformBrowser } from '@angular/common';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
})
export class AppComponent implements OnInit {
  param1: Number = 0;
  private lastPoppedUrl!: string;
  private yScrollStack: number[] = [];
  url: string = 'home';
  constructor(
    @Inject(PLATFORM_ID) private platformId: Object,
    private location: Location,
    private _router: Router,
    private route: ActivatedRoute,
    private apiService: ApicallService,
    private projectService: ProjectSeoService
  ) { }

  ngOnInit() {
    if (isPlatformBrowser(this.platformId)) {
      this.location.subscribe((ev: PopStateEvent) => {
        console.log(ev.url);

        this.lastPoppedUrl = ev.url!;
      });
      this._router.events.subscribe((value) => {
        if (value instanceof NavigationEnd) {
          this.url = this._router.url.toString().replace('/', '');

        }
      });
      this._router.events.subscribe((ev: any) => {
        if (ev instanceof NavigationStart) {
          if (ev.url != this.lastPoppedUrl)
            if (isPlatformBrowser(this.platformId)) {
              this.yScrollStack.push(window.scrollY);
            }
        } else if (ev instanceof NavigationEnd) {
          if (ev.url == this.lastPoppedUrl) {
            this.lastPoppedUrl = 'undefined';
            if (this.yScrollStack.pop() != undefined) {
              let y = this.yScrollStack.pop();
              console.log(this.yScrollStack.pop());
              //window.scrollTo(0, this.yScrollStack.pop());
            }
          } else
            if (isPlatformBrowser(this.platformId)) {
              window.scrollTo(0, 0);
            }
        }
      });
    }
    this.route.queryParams.subscribe((params) => { });
  }

  //   onActivate(event) {
  //     // window.scroll(0,0);

  //     window.scroll({
  //             top: 0,
  //             left: 0,
  //             behavior: 'smooth'
  //      });

  //      //or document.body.scrollTop = 0;
  //      //or document.querySelector('body').scrollTo(0,0)

  //  }
}
