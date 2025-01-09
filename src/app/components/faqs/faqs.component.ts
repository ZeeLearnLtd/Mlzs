import { Component, Input } from '@angular/core';
import { ProjectSeoService } from 'src/app/services/projectseo.service';

@Component({
  selector: 'app-faqs',
  templateUrl: './faqs.component.html',
  styleUrls: ['./faqs.component.css']
})
export class FaqsComponent {
  subscriptionnav: any;
  spinner:boolean=false
  faqdata: any;
  @Input() faqdataList:any=["test"];
  public isCollapsed: boolean [] = [];
  showBody:boolean=false;
  valCheck:boolean=false

 constructor(private projectService: ProjectSeoService,){}

  ngOnInit(): void {
    this.faqdata = this.faqdataList
    console.log('call')
    this.subscriptionnav = this.projectService
      .onFaqsMessage()
      .subscribe((message) => {
        console.log('message',message)
        this.spinner=false
        if (message) {
          
      this.faqdata = message.text
        }
      });
  }


  getInputVal(val:any){
  }
}
