import { Component, Input } from '@angular/core';
import { ApicallService } from 'src/app/services/apicall.service';
import { ProjectSeoService } from 'src/app/services/projectseo.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-faqs',
  templateUrl: './faqs.component.html',
  styleUrls: ['./faqs.component.css']
})
export class FaqsComponent {
  projectId = environment.projectid
  subscriptionnav: any;
  spinner: boolean = false
  faqdata: any;
  public isCollapsed: boolean[] = [];
  showBody: boolean = false;
  valCheck: boolean = false
  faqsData: any;
  img_content: any;
  contentData: any;

  constructor(private projectService: ProjectSeoService, private _service: ApicallService) { }

  ngOnInit(): void {
    this.getfaqs_data();
  }


  // getseo() {
  //   let tbody = {
  //     slug: 'faqs',
  //     Projectid: environment.projectid,
  //   };
  //   this._service.getGetseo(tbody).subscribe((data: any) => {
  //     this.projectService.sendMessageblog(data?.data?.blog);
  //     this.projectService.sendMessageseo(data?.data?.testimony);
  //     this.projectService.sendMessageFaqs(data?.data?.faq);
  //     this.projectService.setmeta(data?.data);

  //   });
  // }


  getfaqs_data() {
    let tbody = {
      Type: "faqs",
      pageurl: '',
      Project_Id: this.projectId
    };
    this._service.getContentDataList(tbody).subscribe((data: any) => {
      let res = data.data[0].contentData
      this.faqsData = JSON.parse(res);
    });
  }
}
