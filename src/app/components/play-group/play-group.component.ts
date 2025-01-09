import { Component,OnInit } from '@angular/core';
import { ProjectSeoService } from 'src/app/services/projectseo.service';
import { environment } from 'src/environments/environment';
import { ApicallService } from 'src/app/services/apicall.service';
@Component({
  selector: 'app-play-group',
  templateUrl: './play-group.component.html',
  styleUrls: ['./play-group.component.css']
})
export class PlayGroupComponent implements OnInit{
  headerTitle="Playgroup"
  faqdata: any;

  constructor(
    private projectService: ProjectSeoService,
    private apiService: ApicallService
  ) {

  }
  ngOnInit(): void {
    this.getseo();
  }

  scrollToPosition() {
    window.scrollTo({
      top: 300,  // Scroll to the top of the page
      left: 0, // Horizontal scroll (set to 0 for no horizontal scroll)
      behavior: 'smooth'  // Smooth scrolling effect
    });
  }
  getseo() {
    let tbody = {
      slug: 'playgroup',
      Projectid: environment.projectid,
    };
    this.apiService.getGetseo(tbody).subscribe((data: any) => {
     this.projectService.sendMessagebread(data?.data?.breadcrumb);
     this.projectService.sendMessageblog(data?.data?.blog);
     this.projectService.sendMessageseo(data?.data?.testimony);
     this.projectService.sendMessageFaqs(data?.data?.faq);
     this.projectService.setmeta(data.data);
    });
    this.scrollToPosition()
  }

}
