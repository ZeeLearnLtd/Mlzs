import { Component,OnInit} from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ApicallService } from 'src/app/services/apicall.service';
import { ProjectSeoService } from 'src/app/services/projectseo.service';
import { environment } from 'src/environments/environment';
@Component({
  selector: 'app-partner-landing',
  templateUrl: './partner-landing.component.html',
  styleUrls: ['./partner-landing.component.css']
})
export class PartnerLandingComponent implements OnInit {
  headerTitle:any="";
  citynm:string="";
constructor(private activeRoute:ActivatedRoute, private projectService: ProjectSeoService,private apiService: ApicallService) {
  
}
  ngOnInit(): void {
    let paramscity = this.activeRoute.snapshot.paramMap.get('city'); 
    if(paramscity){
      let str = paramscity.split('-');
      this.citynm=str[3];
    }
    let params = this.activeRoute.snapshot.paramMap.get('partnerLanding'); 
    this.headerTitle = params;
    this.getseo();
  }
  getseo() {
    let tbody = {
      slug: 'center-page',
      Projectid: environment.projectid,
      city:this.citynm,
      centername:this.headerTitle
    };
    this.apiService.getGetseo(tbody).subscribe((data: any) => {

      this.projectService.sendMessageblog(data?.data?.blog);
      this.projectService.sendMessageseo(data?.data?.testimony);
      this.projectService.sendMessageFaqs(data?.data?.faq);
      this.projectService.setmeta(data?.data);

    });
  }

}
