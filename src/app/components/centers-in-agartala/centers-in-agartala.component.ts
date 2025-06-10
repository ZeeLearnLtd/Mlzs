import { Component, Inject, Input, OnInit, PLATFORM_ID } from '@angular/core';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { CommonService } from '../service/common.service';
import { environment } from 'src/environments/environment';
import { ProjectSeoService } from 'src/app/services/projectseo.service';
import { ApicallService } from 'src/app/services/apicall.service';
import { DomSanitizer } from '@angular/platform-browser';
import { isPlatformBrowser } from '@angular/common';
@Component({
  selector: 'app-centers-in-agartala',
  templateUrl: './centers-in-agartala.component.html',
  styleUrls: ['./centers-in-agartala.component.css']
})
export class CentersInAgartalaComponent implements OnInit {
  @Input() cityname: string = "";
  all_data_list: any = [];
  citylist: any = [];
  allcityList: any = [];
  virtual_url: any;
  constructor(
    @Inject(PLATFORM_ID) private platformId: Object,
    private router: Router,
    private ngxSpinner: NgxSpinnerService,
    private _service: CommonService,
    private apiService: ApicallService, public sanitizer: DomSanitizer
  ) { }

  ngOnInit(): void {

    this.getAllDataList();
  }

  gotTopage(val: any) {

  }

  getAllDataList() {
    this.ngxSpinner.show();
    this._service.get_allCountryList().subscribe(
      res => {
        this.ngxSpinner.hide();
        this.all_data_list = res;
        this.getcenterlist();
      }
    )
  }

  oncitychange(val: any) {
    let data
    if (val == "") {
      data = this.allcityList;
    }
    else {
      data = this.allcityList.filter((dt: any) => {
        return dt.Franchisee_Code == val
      }).map((obj: any) => {
        return obj;
      })
    }
    this.citylist = data;
  }
  fn_ClientFilter(event: any) {
    let val = event.target.value.toLowerCase();
    if (!val) {
      this.citylist = this.allcityList;
    }
    this.citylist = this.allcityList.filter(function (dt: any): any {
      if (
        dt?.Pin_Code?.toString().toLowerCase().indexOf(val) !== -1 ||
        !val
      ) {
        // found match, return true to add to result set
        return true;
      }
    })
  }

  getcenterlist() {
    this.citylist = [];
    this.allcityList = [];
    let data = this.all_data_list.filter((dt: any) => {
      return dt.City_Name == this.cityname
    }).map((obj: any) => {
      return obj;
    });
    this.citylist = data;
    this.allcityList = data;
  }

  openVirtualUrl(url: any) {
    this.virtual_url = this.sanitizer.bypassSecurityTrustResourceUrl(url)
  }

  setaddress(data: any) {

    let jdata = {
      "franchisecode": data.Franchisee_Code
    }
    return this.apiService.checkMicrosite(jdata).subscribe({
      next: (resp: any) => {
        if (resp.data) {
          if (resp.data[0]?.url) {
            if (isPlatformBrowser(this.platformId)) {
              window.open(resp.data[0].url, "_blank");
            }
          }
          else {
            //this._service.savesession("uddixadd", this._service.setencrypt(JSON.stringify(data)));
            if (isPlatformBrowser(this.platformId)) {
              this.router.navigateByUrl(`best-preschool-in-${this.cityname}/${data.Franchisee_Name}`)
            }
          }
        }
      },
      error: (error) => {
        console.log(error);
      }
    })

  }
}
