import { Component,OnInit} from '@angular/core';
import { ApicallService } from 'src/app/services/apicall.service';
import { ProjectSeoService } from 'src/app/services/projectseo.service';
import { environment } from 'src/environments/environment';
@Component({
  selector: 'app-privacy-policy',
  templateUrl: './privacy-policy.component.html',
  styleUrls: ['./privacy-policy.component.css']
})
export class PrivacyPolicyComponent implements OnInit{
  headerTitle = 'Privacy Policy';

  constructor( private apiService: ApicallService,
    private projectService: ProjectSeoService,){}
ngOnInit(): void {
  this.getseo();
}
getseo() {
  let tbody = {
    slug: 'legacy',
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
