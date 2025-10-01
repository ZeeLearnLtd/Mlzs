import { Component, OnInit } from '@angular/core';
import { ProjectSeoService } from 'src/app/services/projectseo.service';
import { CommonService } from '../service/common.service';
import { environment } from 'src/environments/environment';
import { ApicallService } from 'src/app/services/apicall.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {
  receivedSearchData: any;
  search_data_List: any;
  errorMsg: boolean = false
  spinner: boolean = true
  page_count: any = 0;
  inputValue = ''
  constructor(private dataService: ProjectSeoService, private common_service: CommonService,
    private projectService: ProjectSeoService,
    private apiService: ApicallService,
    private route: ActivatedRoute,
    private _router: Router,
  ) {

  }

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      this.inputValue = params['q'] || '';
      if (this.inputValue) {
        this.getSearchDataList();
      }
    });
    this.getseo();
    this.spinner = true
    this.dataService.currentMessage.subscribe(message => {
      this.receivedSearchData = message;
      if (this.receivedSearchData != "") {
        this.spinner = true;
        this.getSearchDataList();
      } else {
        this.search_data_List = ['']
        this.errorMsg = true
        this.spinner = false;
      }
      console.log('receivedSearchData', this.receivedSearchData);
    });
  }


  getseo() {
    let tbody = {
      slug: 'search',
      Projectid: environment.projectid,
    };
    this.apiService.getGetseo(tbody).subscribe((data: any) => {
      this.projectService.sendMessagebread(data?.data?.breadcrumb);
      this.projectService.sendMessageblog(data?.data?.blog);
      this.projectService.sendMessageseo(data?.data?.testimony);
      this.projectService.sendMessageFaqs(data?.data?.faq);
      this.projectService.setmeta(data?.data);

    });
  }

  getSearchDataList() {
    this.search_data_List = ['']
    if (this.receivedSearchData == '') {
      this.receivedSearchData = this.inputValue;
    }
    this.spinner = true;
    let obj = {
      "query": this.receivedSearchData
    }
    this.common_service.searchDataList(obj).subscribe(
      res => {
        this.errorMsg = false
        this.spinner = false
        this.search_data_List = res.urls.matches;
        this._router.navigate(['/search'], { queryParams: { q: this.inputValue } })
        this.page_count = this.search_data_List.length
      }
    )
  }
}
