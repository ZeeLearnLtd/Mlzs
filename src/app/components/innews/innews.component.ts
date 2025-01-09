import {
  Component,
  ElementRef,
  EventEmitter,
  Output,
  ViewChild,
} from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import {
  Observable,
  Subject,
  debounceTime,
  distinctUntilChanged,
  fromEvent,
  switchMap,
} from 'rxjs';
import { ApicallService } from 'src/app/services/apicall.service';
import { HomeSeoService } from 'src/app/services/homeseo.service';
import { ProjectSeoService } from 'src/app/services/projectseo.service';
import { environment } from 'src/environments/environment';
import { NgxSpinnerService } from "ngx-spinner";
@Component({
  selector: 'app-innews',
  templateUrl: './innews.component.html',
  styleUrls: ['./innews.component.css'],
})
export class InnewsComponent {
  blogdetails: any;
  filteredblogList: any;
  headerTitle="In News"
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
    //
  }
  ngOnInit(): void {
    this.getseo();
    
  }
  onChange(input: string) {
    if (input != '' && input != null && input.length > 3) {
      this.input.next(input);
    } else {
      this.filteredblogList = this.blogdetails;
    }
  }
  getseo() {
    this.ngxSpinner.show();
    let tbody = {
      slug: 'blogs',
      Projectid: environment.projectid,
    };
    this.apiService.getGetseo(tbody).subscribe((data: any) => {
      this.ngxSpinner.hide();
      if (data.data != null && data.data != '' && data.data != undefined) {
        this.ngxSpinner.hide();
        this.projectService.sendMessagebread(data.data.breadcrumb);
        this.projectService.sendMessageblog(data.data.blog);
        this.projectService.sendMessageseo(data.data.testimony);
        this.projectService.setmeta(data.data);
      }
      this.getblogdata('');
    });
  }
  getblogdata(param: string) {
    let tbody = {
      slug: param,
      Projectid: environment.projectid,
      type: 'news',
    };
    this.apiService.getGetblog(tbody).subscribe((data: any) => {
      this.ngxSpinner.hide();
      this.blogdetails = data.data.blog;
      this.filteredblogList = this.blogdetails;
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
}
