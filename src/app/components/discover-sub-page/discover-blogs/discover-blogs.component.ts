import { Component, OnInit, AfterViewInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable, Subscription, of, switchMap, tap } from 'rxjs';
import { ApicallService } from 'src/app/services/apicall.service';
import { HomeSeoService } from 'src/app/services/homeseo.service';
import { ProjectSeoService } from 'src/app/services/projectseo.service';
import { environment } from 'src/environments/environment';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';

@Component({
  selector: 'app-discover-blogs',
  templateUrl: './discover-blogs.component.html',
  styleUrls: ['./discover-blogs.component.css']
})
export class DiscoverBlogsComponent {
  projectId = environment.projectid
  project$: Observable<any> | undefined;
  subscriptionnav!: Subscription;
  testimonydata: any;
  testimonialData: any = [];
  testimonialDataList: any;
  blogsData: any;
  firstBlog: any;
  Selectedcategory:string="";
  blogcategory:any=[];
  alldata:any=[];
  constructor(
    private route: ActivatedRoute,
    private seoService: HomeSeoService,
    private projectService: ProjectSeoService,
    private apiService: ApicallService,
    private _service: ApicallService,
    private sanitizer: DomSanitizer
  ) {
    //
  }


  ngOnInit(): void {
    this.getseo()

  }

  getseo() {
    let tbody = {
      slug: 'blogs',
      Projectid: environment.projectid,
    };
    this.apiService.getGetseo(tbody).subscribe((data: any) => {
      this.getnews_data();
      this.projectService.sendMessagebread(data.data.breadcrumb);
      this.projectService.sendMessageblog(data?.data?.blog);
      this.projectService.sendMessageseo(data?.data?.testimony);
      this.projectService.sendMessageFaqs(data?.data?.faq);
      this.projectService.setmeta(data?.data);

    });
  }
  getnews_data() {
    let tbody = {
      Type: "blog",
      pageurl: '',
      Project_Id: this.projectId
    };
    this._service.getContentDataList(tbody).subscribe((data: any) => {
      if(data?.data[0]?.contentData){
        let res = data.data[0].contentData
        this.blogsData = JSON.parse(res);
        this.firstBlog = this.blogsData[0].OtherFiles ? this.blogsData[0].OtherFiles : this.blogsData[0].logofiles;
        this.alldata=JSON.parse(res);
      }else{
          this.blogsData=[];
          this.alldata=[];
      }    
      if(data?.data[0]?.AssignCategory){
        this.blogcategory=JSON.parse(data?.data[0]?.AssignCategory)
      } else{
        this.blogcategory=[];
      }   
    });

  }

  onSearchChange(event: Event) {
  const value = (event.target as HTMLInputElement).value;
  console.log('Search input changed:', value);
  
  this.blogsData = this.alldata.filter((item:any) =>
    item?.Title?.toLowerCase().includes(value?.toLowerCase()) 
  );
  this.firstBlog = this.blogsData[0].OtherFiles ? this.blogsData[0].OtherFiles : this.blogsData[0].logofiles;
}

  onchangecategory(id:string){
     if(id!=""){
      this.blogsData=this.alldata.filter((dt:any)=>{
        return  dt.category.includes(id);
         
      }).map((obj:any)=>{
        return obj;
      });
      this.firstBlog = this.blogsData[0].OtherFiles ? this.blogsData[0].OtherFiles : this.blogsData[0].logofiles;
    }
    else{
      this.blogsData=this.alldata;
      this.firstBlog = this.blogsData[0].OtherFiles ? this.blogsData[0].OtherFiles : this.blogsData[0].logofiles;
    }
   
  }

}
