import { Component } from '@angular/core';
import { ApicallService } from 'src/app/services/apicall.service';
import { ProjectSeoService } from 'src/app/services/projectseo.service';
import { environment } from 'src/environments/environment';
@Component({
  selector: 'app-litera-foundational-stage1',
  templateUrl: './litera-foundational-stage1.component.html',
  styleUrls: ['./litera-foundational-stage1.component.css']
})
export class LiteraFoundationalStage1Component {

  constructor(private apiService: ApicallService, private projectService: ProjectSeoService,) { }

  onInit(): void {
    this.getseo();
  }

  getseo() {
    let tbody = {
      slug: 'litera-foundational-stage-1',
      Projectid: environment.projectid,
    };
    this.apiService.getGetseo(tbody).subscribe((data: any) => {
      this.projectService.sendMessageblog(data?.data?.blog);
      this.projectService.sendMessageseo(data?.data?.testimony);
      this.projectService.sendMessageFaqs(data?.data?.faq);
      // this.projectService.setmeta(data?.data);

    });
  }

}

