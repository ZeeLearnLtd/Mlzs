import { Component,OnInit} from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ApicallService } from 'src/app/services/apicall.service';
import { ProjectSeoService } from 'src/app/services/projectseo.service';
import { environment } from 'src/environments/environment';
@Component({
  selector: 'app-preschool-in-agartala',
  templateUrl: './preschool-in-city.component.html',
  styleUrls: ['./preschool-in-city.component.css']
})
export class PreschoolInCityComponent implements OnInit{
  headerTitle:string=""  
  readMore:boolean=true
  readLess:boolean=false
  readMoreContent:boolean=false
constructor(private activeRoute:ActivatedRoute,private projectService: ProjectSeoService,private apiService: ApicallService){}

  ngOnInit(): void {
    let getRout = this.activeRoute.snapshot.paramMap.get('city');    
    if(getRout){
      let str = getRout.split('-');
      this.headerTitle=str[3];
    }
    this.getseo();
  }
  getseo() {
    let tbody = {
      slug: 'city-page',
      Projectid: environment.projectid,
      city:this.headerTitle      
    };
    this.apiService.getGetseo(tbody).subscribe((data: any) => {

      this.projectService.sendMessageblog(data?.data?.blog);
      this.projectService.sendMessageseo(data?.data?.testimony);
      this.projectService.sendMessageFaqs(data?.data?.faq);
      this.projectService.setmeta(data?.data);

    });
  }

  

  showContent(val:any){
  if(val == 1){
    this.readMore=false
    this.readLess=true
    this.readMoreContent = true
  }
  if(val == 2){
    this.readMore=true
    this.readLess=false
    this.readMoreContent = false
  }
  }


}
