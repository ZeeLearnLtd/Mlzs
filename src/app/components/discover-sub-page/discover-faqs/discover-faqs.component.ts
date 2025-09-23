import { Component, Input } from '@angular/core';
import { ApicallService } from 'src/app/services/apicall.service';
import { ProjectSeoService } from 'src/app/services/projectseo.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-discover-faqs',
  templateUrl: './discover-faqs.component.html',
  styleUrls: ['./discover-faqs.component.css']
})
export class DiscoverFaqsComponent {
  projectId = environment.projectid
  subscriptionnav: any;
  spinner: boolean = false
  faqdata: any;
  public isCollapsed: boolean[] = [];
  showBody: boolean = false;
  valCheck: boolean = false
  faqsData: any;
  img_content: any;
  contentData: any;
  faqscategory: any = [];
  alldata: any = [];
  Selectedcategory: string = "";
  sortedFaqs: any = [];
  constructor(private projectService: ProjectSeoService, private _service: ApicallService) { }

  ngOnInit(): void {
    this.getseo()

  }


  getseo() {
    let tbody = {
      slug: 'faqs',
      Projectid: environment.projectid,
    };
    this._service.getGetseo(tbody).subscribe((data: any) => {
      this.getfaqs_data();
      this.projectService.sendMessagebread(data.data.breadcrumb);
      this.projectService.sendMessageblog(data?.data?.blog);
      this.projectService.sendMessageseo(data?.data?.testimony);
      this.projectService.sendMessageFaqs(data?.data?.faq);
      this.projectService.setmeta(data?.data);

    });
  }


  getfaqs_data() {
    let tbody = {
      Type: "faqs",
      pageurl: '',
      Project_Id: this.projectId
    };
    this._service.getContentDataList(tbody).subscribe((data: any) => {
      if (data?.data[0]?.contentData) {
        let res = data.data[0].contentData
        this.faqsData = JSON.parse(res);
        this.alldata = JSON.parse(res);
        this.sortedFaqs = [...this.faqsData].sort((a, b) => {
          const sortA = a.sort ? parseInt(a.sort, 10) : 9999;
          const sortB = b.sort ? parseInt(b.sort, 10) : 9999;
          return sortA - sortB;
        });
      } else {
        this.faqsData = [];
        this.alldata = [];
      }
      if (data?.data[0]?.AssignCategory) {
        this.faqscategory = JSON.parse(data?.data[0]?.AssignCategory)
      } else {
        this.faqscategory = [];
      }
    });
  }


  onSearchChange(event: Event) {
    const value = (event.target as HTMLInputElement).value;
    this.faqsData = this.alldata.filter((item: any) =>
      item?.Title?.toLowerCase().includes(value?.toLowerCase())
    );
  }

  onchangecategory(id: string) {
    if (id != "") {
      this.faqsData = this.alldata.filter((dt: any) => {
        return dt.category.includes(id);

      }).map((obj: any) => {
        return obj;
      });
    }
    else {
      this.faqsData = this.alldata;
    }
  }

}
