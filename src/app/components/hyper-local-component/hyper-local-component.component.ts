import { Component, Inject, OnInit, PLATFORM_ID } from '@angular/core';
  import { ActivatedRoute,Router } from '@angular/router';
  import { Observable, of, switchMap, tap, Subscription } from 'rxjs';
  import { ApicallService } from 'src/app/services/apicall.service';
  import { HomeSeoService } from 'src/app/services/homeseo.service';
  import { ProjectSeoService } from 'src/app/services/projectseo.service';
  import { environment } from 'src/environments/environment';
  import { NgxSpinnerService } from 'ngx-spinner';
  import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
  import { FormBuilder, FormGroup, Validators } from '@angular/forms';
  import { isPlatformBrowser } from '@angular/common';
import { CommonService } from '../service/common.service';


@Component({
  selector: 'app-hyper-local-component',
  templateUrl: './hyper-local-component.component.html',
  styleUrls: ['./hyper-local-component.component.css']
})
export class HyperLocalComponentComponent {
  state:string="";
  city:string="";
  projectId = environment.projectid
    project$: Observable<any> | undefined;
    subProfileInfo: any;
    subscriptionnav!: Subscription;
    testimonydata: any = [];
    profile_title: any;
    bannerList: any;
  
 constructor(
      @Inject(PLATFORM_ID) private platformId: Object,
      private sanitizer: DomSanitizer,
      private route: ActivatedRoute,
      private seoService: HomeSeoService,
      private projectService: ProjectSeoService,
      private apiService: ApicallService,
      private ngxSpinner: NgxSpinnerService,
      private fb: FormBuilder
      ,private router:Router,
       private common: CommonService
    ) {
  
    }

  ngOnInit(): void {
    this.state = this.route.snapshot.paramMap.get('state')!;
    this.city = this.route.snapshot.paramMap.get('city')!;
    console.log(this.state);
    console.log(this.city);
    this.getseo();
  }

  
    sanitizeUrl(url: string): SafeUrl {
      return this.sanitizer.bypassSecurityTrustUrl(url);
    }
  
    getBanner() {
      let tbody = {
        Type: "banner",
        pageurl: '',
        Project_Id: this.projectId
      };
      this.apiService.getContentDataList(tbody).subscribe((data: any) => {
        let bannerData = data.data[0].contentData
        this.bannerList = JSON.parse(bannerData)
      })
    }
  
    getseo() {
      let slug
      let type
      if(this.state){
        slug=this.state
      }
      if(this.city){
        slug=this.state+'/'+this.city
      }
      let tbody = {
        slug: slug,
        Projectid: environment.projectid,
      };
      this.apiService.getGetseo(tbody).subscribe((data: any) => {
        this.getBanner();
       // this.getcenter();
        if(data.data){
          if(data?.data?.breadcrumb){
            this.projectService.sendMessagebread(data?.data?.breadcrumb);
          }          
          this.projectService.sendMessageblog(data?.data?.blog);
          this.projectService.sendMessageseo(data?.data?.testimony);
          this.projectService.sendMessageFaqs(data?.data?.faq);
          this.projectService.sendMessageNews(data?.data?.news);
          this.projectService.setmeta(data?.data);
        }else{
           this.router.navigateByUrl('page-not-found');
        }
          
          
      });
    }

    // getcenter(){
    //    let slug
    //   let type
    //   if(this.state){
    //     slug=this.state,
    //     type='State'
    //   }
    //   if(this.city){
    //     slug=this.state+'/'+this.city
    //     type='City'
    //   }
    //    let tbody = {
    //     slug: slug,
    //     type:type
    //   };
    //   this.common.get_centerdatabyslug(tbody).subscribe((
    //     res => {
    //       console.log(res);
    //   }
    // ))
    // }

  }
  

