import { Pipe, PipeTransform, Component, OnInit, AfterViewInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable, Subscription, of, switchMap, tap } from 'rxjs';
import { ApicallService } from 'src/app/services/apicall.service';
import { HomeSeoService } from 'src/app/services/homeseo.service';
import { ProjectSeoService } from 'src/app/services/projectseo.service';
import { environment } from 'src/environments/environment';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
declare var $: any;  // Declare jQuery
// import * as $ from 'jquery';
@Component({
  selector: 'app-social-wall',
  templateUrl: './social-wall.component.html',
  styleUrls: ['./social-wall.component.css']
})
export class SocialWallComponent {

  projectId = environment.projectid
  project$: Observable<any> | undefined;
  subscriptionnav!: Subscription;
  socialData: any;
  constructor(
    private route: ActivatedRoute,
    private seoService: HomeSeoService,
    private projectService: ProjectSeoService,
    private apiService: ApicallService,
    private _service: ApicallService,
    private sanitizer: DomSanitizer
  ) {
  }

  ngOnInit(): void {
    this.getnews_data();
  }


  getnews_data() {
    let tbody = {
      Type: "Social Post",
      pageurl: '',
      Project_Id: this.projectId
    };
    this._service.getContentDataList(tbody).subscribe((data: any) => {
      let res = data.data[0].contentData
      this.socialData = JSON.parse(res);
      console.log('Social data list', this.socialData)
    });

  }
}
