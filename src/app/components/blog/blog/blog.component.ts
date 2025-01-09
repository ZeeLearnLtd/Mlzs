import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { ApicallService } from 'src/app/services/apicall.service';
import { HomeSeoService } from 'src/app/services/homeseo.service';
import { ProjectSeoService } from 'src/app/services/projectseo.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-blog',
  templateUrl: './blog.component.html',
  styleUrls: ['./blog.component.css'],
})
export class BlogComponent implements OnInit {
  blogDetails: boolean = true;
  allBlogs: boolean = false;
  headerTitle = 'Blog';

  constructor(
    private route: ActivatedRoute,
    private seoService: HomeSeoService,
    private projectService: ProjectSeoService,
    private apiService: ApicallService,
    private ngxSpinner: NgxSpinnerService
  ) {}
  ngOnInit(): void {
    let params = this.route.snapshot.paramMap.get('name')!;

    this.route.params.subscribe((params: any) => {
      params = params['name'];
      // console.log('all params', params);
      if (params == 'all') {
        this.blogDetails = true;
        this.allBlogs = false;
      } else {
        this.blogDetails = false;
        this.allBlogs = true;
      }
    });
  }
  getseo() {
    let tbody = {
      slug: 'blogs',
      Projectid: environment.projectid,
    };
    this.apiService.getGetseo(tbody).subscribe((data: any) => {
      this.projectService.sendMessagebread(data.data.breadcrumb);

      this.projectService.setmeta(data.data);
    });
  }
}
