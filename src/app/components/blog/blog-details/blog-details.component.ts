import { Component, ElementRef, EventEmitter, Output, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable, Subject, debounceTime, distinctUntilChanged, fromEvent, switchMap } from 'rxjs';
import { ApicallService } from 'src/app/services/apicall.service';
import { HomeSeoService } from 'src/app/services/homeseo.service';
import { ProjectSeoService } from 'src/app/services/projectseo.service';
import { environment } from 'src/environments/environment';
import { NgxSpinnerService } from 'ngx-spinner';
@Component({
  selector: 'app-blog-details',
  templateUrl: './blog-details.component.html',
  styleUrls: ['./blog-details.component.css'],
})
export class BlogDetailsComponent {
  tindex:number=10;
  totalrecord:number=0;
  findex:number=0;
  more:boolean=true;
  blogdetails: any;
  filteredblogList: any;
  selectedindex!:any;
  selectedcategory:number=0;
  blogList: any;
  categorydata:any=[];
  ucenterList: any;    
  input = new Subject<string>();
  constructor(
    private route: ActivatedRoute,
    private seoService: HomeSeoService,
    private projectService: ProjectSeoService,
    private apiService: ApicallService,
    private ngxSpinner: NgxSpinnerService
  ) {
    this.input
      .pipe(debounceTime(300))
      .pipe(distinctUntilChanged())
      .subscribe((input) => {
        this.filterResults(input);
      });
  }
  ngOnInit(): void {
    this.getseo();
  }
  onChange(input: string) {
    if (input != '' && input != null && input.length > 3) {
      this.input.next(input);
    }
    else {
      this.filteredblogList = this.blogdetails;
    }
  }
  getseo() {
    let tbody = {
      slug: 'blogs',
      Projectid: environment.projectid,
    };
    this.apiService.getGetseo(tbody).subscribe((data: any) => {
      if (data.data != null && data.data != '' && data.data != undefined) {
        this.projectService.sendMessagebread(data.data.breadcrumb);
        this.projectService.sendMessageblog(data.data.blog);
        this.projectService.sendMessageseo(data.data.testimony);
        this.projectService.setmeta(data.data);
      }
      this.getblogdata('',0);
    });
  }
  getblogdata(param: string,categoryid:number) {
    let tbody = {
      slug: param,
      Projectid: environment.projectid,
      CategoryID:categoryid
    };
    this.apiService.getGetblog(tbody).subscribe((data: any) => {
      this.ngxSpinner.hide();
      this.blogdetails = data.data.blog;
      this.filteredblogList = this.blogdetails;
      this.categorydata=data?.data?.Category;
      this.setcentrelist()
      // console.log(data.data);
    });
  }

  filterResults(text: string) {
    if (!text) {
      this.filteredblogList = this.blogdetails;
      return;
    }

    this.filteredblogList = this.blogdetails.filter((blog: { Title: string }) =>
      blog?.Title.toLowerCase().includes(text.toLowerCase())
    );
   
  }
  getblogbycategory(val:any,ind:any){
      this.selectedindex=ind;
      this.selectedcategory=val;
      this.getblogdata('',val);

  }




  setcentrelist()
{
  let dlenth=this.blogdetails.length;
  this.totalrecord=dlenth;
  if(dlenth>10)
  {
    this.tindex=10;
  }
  else
  {
    this.tindex=dlenth;
    // this.more=false;
  }

  this.blogList=this.blogdetails.slice(this.findex,this.tindex);
  
}   


  setcentrelistclick()
{
  let dlenth=this.blogdetails.length;
  let nindex=this.tindex+10;

  if( dlenth> this.tindex)
  {


    if(nindex>dlenth)
    {
       this.tindex=dlenth;
        // this.more=false;
    }
    else
    {
    this.tindex += 10;
    }
  }
  else
  {

  // this.more=false;
  }

  this.blogList=this.blogdetails.slice(this.findex,this.tindex);
 }
}
