import { Component, Inject, OnInit, PLATFORM_ID } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ApicallService } from 'src/app/services/apicall.service';
import { HomeSeoService } from 'src/app/services/homeseo.service';
import { ProjectSeoService } from 'src/app/services/projectseo.service';
import { environment } from 'src/environments/environment';
import { NgxSpinnerService } from 'ngx-spinner';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { isPlatformBrowser } from '@angular/common';

@Component({
  selector: 'app-programmes-main-page',
  templateUrl: './programmes-main-page.component.html',
  styleUrls: ['./programmes-main-page.component.css']
})
export class ProgrammesMainPageComponent {
  constructor(
    @Inject(PLATFORM_ID) private platformId: Object,
    private sanitizer: DomSanitizer,
    private activatedRoute: ActivatedRoute,
    private seoService: HomeSeoService,
    private projectService: ProjectSeoService,
    private apiService: ApicallService,
    private ngxSpinner: NgxSpinnerService,
    private fb: FormBuilder
  ) {

  }
  ngOnInit(): void {
    this.getseo();
  }
  getseo() {
    let tbody = {
      slug: 'academic-programs',
      Projectid: environment.projectid,
    };
    this.apiService.getGetseo(tbody).subscribe((data: any) => {
      if (isPlatformBrowser(this.platformId)) {
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
