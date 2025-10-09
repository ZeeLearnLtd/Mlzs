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
  @Input() shadowFaq: boolean = false;
  sortedFaqs: any = [];
  constructor(private projectService: ProjectSeoService, private _service: ApicallService) { }

  ngOnInit(): void {
  //  console.log('shadowFaq', this.shadowFaq);
    this.getfaqs_data();
  }
  getfaqs_data() {
    this.subscriptionnav = this.projectService
      .onFaqsMessage()
      .subscribe((message) => {
        this.spinner = false
        if (message) {
          this.faqsData = message.text
          this.sortedFaqs = [...this.faqsData].sort((a, b) => {
            const sortA = a.sort ? parseInt(a.sort, 10) : 9999;
            const sortB = b.sort ? parseInt(b.sort, 10) : 9999;
            return sortA - sortB;
          });
        }
      });
  }
}
