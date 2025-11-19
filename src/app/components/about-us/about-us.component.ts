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
  selector: 'app-about-us',
  templateUrl: './about-us.component.html',
  styleUrls: ['./about-us.component.css']
})
export class AboutUsComponent implements OnInit {
  segment: any
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
    const urlSegments = this.activatedRoute.snapshot.url;
    this.segment = urlSegments[0]?.path;
     if (isPlatformBrowser(this.platformId)) {
    if (this.segment == 'admissions') {
      (document.getElementById('about_content_bg') as HTMLElement).style.backgroundColor = '#FFF',
        (document.getElementById('title_content') as HTMLElement).style.color = '#000',
        (document.getElementById('num_content') as HTMLElement).style.color = '#014876'

    } else {
      (document.getElementById('about_content_bg') as HTMLElement).style.backgroundColor = '#004878',
        (document.getElementById('title_content') as HTMLElement).style.color = '#FFF',
        (document.getElementById('num_content') as HTMLElement).style.color = '#FFF'
    }
  }
  }

  getseo() {
    let tbody = {
      slug: 'about-us',
      Projectid: environment.projectid,
    };
    this.apiService.getGetseo(tbody).subscribe((data: any) => {
     
        this.projectService.sendMessagebread(data?.data?.breadcrumb);
        this.projectService.sendMessageblog(data?.data?.blog);
        this.projectService.sendMessageseo(data?.data?.testimony);
        this.projectService.sendMessageFaqs(data?.data?.faq);
        this.projectService.sendMessageNews(data?.data?.news);
        this.projectService.setmeta(data?.data);
     
    });
  }
}
