import { Component,OnInit } from '@angular/core';
import { ProjectSeoService } from 'src/app/services/projectseo.service';
import { environment } from 'src/environments/environment';
import { ApicallService } from 'src/app/services/apicall.service';

@Component({
  selector: 'app-pentemind',
  templateUrl: './pentemind.component.html',
  styleUrls: ['./pentemind.component.css']
})
export class PentemindComponent {
  headerTitle="Péntemind"

  constructor(
    private projectService: ProjectSeoService,
    private apiService: ApicallService
  ) {
    
  }
  ngOnInit(): void {
    this.getseo();
  }

  getseo() {
    let tbody = {
      slug: 'pentemind',
      Projectid: environment.projectid,
    };
    this.apiService.getGetseo(tbody).subscribe((data: any) => {
      this.projectService.sendMessagebread(data.data.breadcrumb);
      this.projectService.sendMessageblog(data.data.blog);
      this.projectService.sendMessageseo(data.data.testimony);
      this.projectService.setmeta(data.data);
    });
  }
}
