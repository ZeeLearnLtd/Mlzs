import { Component } from '@angular/core';
import { ApicallService } from 'src/app/services/apicall.service';
import { ProjectSeoService } from 'src/app/services/projectseo.service';
import { environment } from 'src/environments/environment';
@Component({
  selector: 'app-litera-foundational-stage2',
  templateUrl: './litera-foundational-stage2.component.html',
  styleUrls: ['./litera-foundational-stage2.component.css']
})
export class LiteraFoundationalStage2Component {
  constructor(private apiService: ApicallService, private projectService: ProjectSeoService,) { }

  ngOnInit(): void {
    this.getseo();
  }

  getseo() {
    let tbody = {
      slug: 'academic-programs/primary-school',
      Projectid: environment.projectid,
    };
    this.apiService.getGetseo(tbody).subscribe((data: any) => {
      this.projectService.sendMessagebread(data.data.breadcrumb);
      this.projectService.sendMessageblog(data?.data?.blog);
      this.projectService.sendMessageseo(data?.data?.testimony);
      this.projectService.sendMessageFaqs(data?.data?.faq);
      this.projectService.setmeta_programme(data?.data,'Primary School Programme');

    });
  }
}
