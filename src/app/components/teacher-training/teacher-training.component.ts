import { Component, Inject, OnInit, PLATFORM_ID } from '@angular/core';
import { ProjectSeoService } from 'src/app/services/projectseo.service';
import { environment } from 'src/environments/environment';
import { ApicallService } from 'src/app/services/apicall.service';
import { isPlatformBrowser, isPlatformServer } from '@angular/common';
@Component({
  selector: 'app-teacher-training',
  templateUrl: './teacher-training.component.html',
  styleUrls: ['./teacher-training.component.css']
})
export class TeacherTrainingComponent implements OnInit {
  headerTitle = "Teacher Training Programme";


  constructor(
    @Inject(PLATFORM_ID) private platformId: Object,
    private projectService: ProjectSeoService,
    private apiService: ApicallService
  ) {

  }
  ngOnInit(): void {
    this.getseo();
  }

  scrollToPosition() {
    if (isPlatformServer(this.platformId)) {
      window.scrollTo({
        top: 300,  // Scroll to the top of the page
        left: 0, // Horizontal scroll (set to 0 for no horizontal scroll)
        behavior: 'smooth'  // Smooth scrolling effect
      });
    }
  }

  getseo() {
    let tbody = {
      slug: 'teacher-training-programme',
      Projectid: environment.projectid,
    };
    this.apiService.getGetseo(tbody).subscribe((data: any) => {
      this.projectService.sendMessagebread(data?.data?.breadcrumb);
      this.projectService.sendMessageblog(data?.data?.blog);
      this.projectService.sendMessageseo(data?.data?.testimony);
      this.projectService.sendMessageFaqs(data?.data?.faq);
      this.projectService.setmeta(data.data);
      console.log("data?.data?.faq", data?.data?.faq)
    });
    this.scrollToPosition();
  }
}
