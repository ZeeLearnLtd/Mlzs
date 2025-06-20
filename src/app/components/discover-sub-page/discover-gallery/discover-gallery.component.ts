import { Component, Input } from '@angular/core';
import { ApicallService } from 'src/app/services/apicall.service';
import { ProjectSeoService } from 'src/app/services/projectseo.service';
import { environment } from 'src/environments/environment';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';

@Component({
  selector: 'app-discover-gallery',
  templateUrl: './discover-gallery.component.html',
  styleUrls: ['./discover-gallery.component.css']
})
export class DiscoverGalleryComponent {

  projectId = environment.projectid
  public isCollapsed: boolean[] = [];
  img_content: any;
  contentData: any;
  photoGalleryData: any;
  getFirstData: any;
alldata:any=[];
Selectedcategory:string="";
Assinedcategory:any=[];
  constructor(private projectService: ProjectSeoService,private sanitizer: DomSanitizer, private _service: ApicallService) { }

  ngOnInit(): void {
    this.getseo();
  }


  getseo() {
    let tbody = {
      slug: 'gallery',
      Projectid: environment.projectid,
    };
    this._service.getGetseo(tbody).subscribe((data: any) => {
      this.getPhoto_data();
      this.projectService.sendMessagebread(data.data.breadcrumb);
      this.projectService.sendMessageblog(data?.data?.blog);
      this.projectService.sendMessageseo(data?.data?.testimony);
      this.projectService.sendMessageFaqs(data?.data?.faq);
      this.projectService.setmeta(data?.data);

    });
  }

  getPhoto_data() {
    let tbody = {
      Type: "PhotoGallery",
      pageurl: '',
      Project_Id: this.projectId
    };
    this._service.getContentDataList(tbody).subscribe((data: any) => {
      
       if(data?.data[0]?.contentData){
        let res = data.data[0].contentData
        this.photoGalleryData = JSON.parse(res);
        //this.getFirstData = this.photoGalleryData[0].OtherFiles[0].value;
        this.getFirstData = this.photoGalleryData[0].OtherFiles ? this.photoGalleryData[0].OtherFiles : this.photoGalleryData[0].logofiles;
        this.alldata=JSON.parse(res);
      }else{
          this.photoGalleryData=[];
          this.alldata=[];
      }    
      if(data?.data[0]?.AssignCategory){
        this.Assinedcategory=JSON.parse(data?.data[0]?.AssignCategory)
      } else{
        this.Assinedcategory=[];
      }   
    });
  }

  
  
  onSearchChange(event: Event) {
  const value = (event.target as HTMLInputElement).value;
  console.log('Search input changed:', value);
  
  this.photoGalleryData = this.alldata.filter((item:any) =>
    item?.Title?.toLowerCase().includes(value?.toLowerCase()) 
  );  
   //this.getFirstData = this.photoGalleryData[0].OtherFiles[0].value;
   this.getFirstData = this.photoGalleryData[0].OtherFiles ? this.photoGalleryData[0].OtherFiles : this.photoGalleryData[0].logofiles;
}

  onchangecategory(id:string){
     if(id!=""){
      this.photoGalleryData=this.alldata.filter((dt:any)=>{
        return  dt.category.includes(id);
         
      }).map((obj:any)=>{
        return obj;
      });      
       //this.getFirstData = this.photoGalleryData[0].OtherFiles[0].value;
       this.getFirstData = this.photoGalleryData[0].OtherFiles ? this.photoGalleryData[0].OtherFiles : this.photoGalleryData[0].logofiles;
    }
    else{
      this.photoGalleryData=this.alldata;
      //this.getFirstData = this.photoGalleryData[0].OtherFiles[0].value;
      this.getFirstData = this.photoGalleryData[0].OtherFiles ? this.photoGalleryData[0].OtherFiles : this.photoGalleryData[0].logofiles;
    }   
  }
  getsanitizeurl(url: string): SafeResourceUrl {
    return this.sanitizer.bypassSecurityTrustResourceUrl(url);
  }
}
