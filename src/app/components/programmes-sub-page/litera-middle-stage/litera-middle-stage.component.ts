import { Component } from '@angular/core';
import { ApicallService } from 'src/app/services/apicall.service';
import { ProjectSeoService } from 'src/app/services/projectseo.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-litera-middle-stage',
  templateUrl: './litera-middle-stage.component.html',
  styleUrls: ['./litera-middle-stage.component.css']
})
export class LiteraMiddleStageComponent {
  constructor(private apiService: ApicallService, private projectService: ProjectSeoService,) { }

  ngOnInit(): void {
    this.getseo();
  }

  getseo() {
    let tbody = {
      slug: 'programmes/middle-school',
      Projectid: environment.projectid,
    };
    this.apiService.getGetseo(tbody).subscribe((data: any) => {
      this.projectService.sendMessagebread(data.data.breadcrumb);
      this.projectService.sendMessageblog(data?.data?.blog);
      this.projectService.sendMessageseo(data?.data?.testimony);
      this.projectService.sendMessageFaqs(data?.data?.faq);
      this.projectService.setmeta(data?.data);

    });
  }
}
