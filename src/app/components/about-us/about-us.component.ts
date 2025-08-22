import { Component,OnInit} from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProjectSeoService } from 'src/app/services/projectseo.service';
import { environment } from 'src/environments/environment';
import { ApicallService } from 'src/app/services/apicall.service';
@Component({
  selector: 'app-about-us',
  templateUrl: './about-us.component.html',
  styleUrls: ['./about-us.component.css']
})
export class AboutUsComponent implements OnInit {
  segment:any
  constructor(
    private activatedRoute: ActivatedRoute){
  }

    ngOnInit(): void {
      const urlSegments = this.activatedRoute.snapshot.url;
      this.segment = urlSegments[0]?.path;
      if(this.segment == 'admissions'){
        (document.getElementById('about_content_bg') as HTMLElement).style.backgroundColor = '#FFF',
        (document.getElementById('title_content') as HTMLElement).style.color = '#000',
         (document.getElementById('num_content') as HTMLElement).style.color = '#014876'
        
      } else{
         (document.getElementById('about_content_bg') as HTMLElement).style.backgroundColor = '#004878',
          (document.getElementById('title_content') as HTMLElement).style.color = '#FFF',
          (document.getElementById('num_content') as HTMLElement).style.color = '#FFF'
      }
    }
}
