import { Component, Inject, Input, OnInit, PLATFORM_ID } from '@angular/core';
import { ApicallService } from 'src/app/services/apicall.service';
import { ProjectSeoService } from 'src/app/services/projectseo.service';
import { environment } from 'src/environments/environment';
import { isPlatformBrowser } from '@angular/common';

@Component({
  selector: 'app-litera-exp',
  templateUrl: './litera-exp.component.html',
  styleUrls: ['./litera-exp.component.css']
})
export class LiteraExpComponent implements OnInit {
  constructor(
    @Inject(PLATFORM_ID) private platformId: Object,
    private apiService: ApicallService,
    private projectService: ProjectSeoService,) { }

  ngOnInit(): void {
    this.getseo();
  }

  getseo() {
    let tbody = {
      slug: 'academics/students-experience',
      Projectid: environment.projectid,
    };
    this.apiService.getGetseo(tbody).subscribe((data: any) => {
      this.projectService.sendMessagebread(data?.data?.breadcrumb);
      this.projectService.sendMessageblog(data?.data?.blog);
      this.projectService.sendMessageseo(data?.data?.testimony);
      this.projectService.sendMessageFaqs(data?.data?.faq);
      this.projectService.setmeta(data?.data);

    });
  }
}
