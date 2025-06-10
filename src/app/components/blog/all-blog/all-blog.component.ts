import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable, of, switchMap, tap } from 'rxjs';
import { ApicallService } from 'src/app/services/apicall.service';
import { HomeSeoService } from 'src/app/services/homeseo.service';
import { ProjectSeoService } from 'src/app/services/projectseo.service';
import { environment } from 'src/environments/environment';
import { NgxSpinnerService } from 'ngx-spinner';
@Component({
  selector: 'app-all-blog',
  templateUrl: './all-blog.component.html',
  styleUrls: ['./all-blog.component.css'],
})
export class AllBlogComponent implements OnInit {
  project$: Observable<any> | undefined;
  blogdetails: any
  constructor(
    private route: ActivatedRoute,
    private seoService: HomeSeoService,
    private projectService: ProjectSeoService,
    private apiService: ApicallService,
    private ngxSpinner: NgxSpinnerService
  ) {
    //
  }
  ngOnInit(): void {
    this.route.params.subscribe((params: any) => {
      this.getblogdata(params['name']);
    });


  }
  getblogdata(param: string) {
    this.ngxSpinner.show();
    let tbody = {
      slug: param,
      Projectid: environment.projectid,
    };
    this.apiService.getGetblog(tbody).subscribe((data: any) => {
      this.ngxSpinner.hide();
      this.blogdetails = data.data;
      this.projectService.sendMessageblog(data.data.blog);
      this.projectService.setmetablog(this.blogdetails);
      this.projectService.sendMessageFaqs(data?.data?.faq);
    });
  }
}
