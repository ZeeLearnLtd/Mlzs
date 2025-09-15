import { Component, Inject, OnInit, PLATFORM_ID } from '@angular/core';
import { CommonService } from '../service/common.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgxSpinnerService } from "ngx-spinner";
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { ProjectSeoService } from 'src/app/services/projectseo.service';
import { environment } from 'src/environments/environment';
import { ApicallService } from 'src/app/services/apicall.service';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { isPlatformBrowser } from '@angular/common';
@Component({
  selector: 'app-locate-us',
  templateUrl: './locate-us.component.html',
  styleUrls: ['./locate-us.component.css']
})
export class LocateUsComponent implements OnInit {
  headerTitle = "Locate Us"
  all_data_list: any;
  countryList: any = [];
  stateList: any = [];
  cityList: any = [];
  franchiseeList: any = [];
  getContryId: any;
  getStateId: any;
  getCityId: any;
  getLocationId: any;
  centerList: any;
  ucenterList: any;
  more: boolean = true;
  lgd: any;

  indiaCountry: any = [];
  searchForm: FormGroup;
  findex: number = 0;
  tindex: number = 50
  totalrecord: number = 0;
  virtual_url: any;
  getZone: any;
  zoneList: any;


  constructor(private _service: CommonService, private fb: FormBuilder, private ngxSpinner: NgxSpinnerService, public sanitizer: DomSanitizer,
    private projectService: ProjectSeoService, private router: Router,
    private apiService: ApicallService) {
    this.searchForm = fb.group({
      zone: [''],
      city: [''],
      state: [''],
      location: [''],
    })
  }

  ngOnInit(): void {
    this.tindex = 50;
    this.getAllDataList();
    this.getseo();
  }

  getseo() {
    let tbody = {
      slug: 'locate-us',
      Projectid: environment.projectid,
    };
    this.apiService.getGetseo(tbody).subscribe((data: any) => {
      if (data.data != undefined) {
        this.projectService.sendMessagebread(data.data.breadcrumb);
        this.projectService.sendMessageblog(data.data.blog);
        this.projectService.sendMessageseo(data.data.testimony);
        this.projectService.setmeta(data.data);
      }
    });
  }
  getAllDataList() {
    this.ngxSpinner.show();
    this._service.get_allCountryList().subscribe(
      res => {
        this.ngxSpinner.hide();
        this.all_data_list = res
        this.india_country();
        this.setcountry();
      }
    )
  }

  india_country() {
    let lgd = this.all_data_list.filter(function (lg: any) {
      return lg.Country_Name === "India";
    }).map(function (lg: any) {
      return lg;
    })
    const key = 'India';
    this.indiaCountry = [...new Map(lgd.map((item: any) => [item[key], item])).values()]
    this.searchForm.get('country')?.patchValue(this.indiaCountry[0].Country_Id)
    this.zoneList = lgd.filter(
      (item: any, index: any, self: any) =>
        index === self.findIndex((t: any) => t.zone === item.zone)
    );
    let lgd1 = this.all_data_list.filter((lg: any) => {
      return lg.Country_Id === Number(this.indiaCountry[0].Country_Id);
    }).map(function (lg: any) {
      return lg;
    })
    const key1 = 'State_Name';
    this.stateList = [...new Map(lgd.map((item: any) => [item[key1], item])).values()]

    this.stateList = this.stateList.sort((a: any, b: any) =>
      a.State_Name !== b.State_Name ? (a.State_Name < b.State_Name ? -1 : 1) : 0
    );
    this.ucenterList = lgd1;
    this.setcentrelist();
  }

  setcountry(): any {
    const key = 'Country_Name';
    this.countryList = [...new Map(this.all_data_list.map((item: any) => [item[key], item])).values()]
  }

  selectZone(zone: any) {
    this.getZone = zone
    let lgd = this.all_data_list.filter(function (lg: any) {
      return lg.zone === zone;
    }).map(function (lg: any) {
      return lg;
    })
    const key = 'State_Name';
    this.stateList = [...new Map(lgd.map((item: any) => [item[key], item])).values()]
    this.searchForm.get('state')?.setValue("");
    this.searchForm.get('city')?.setValue("");
    this.searchForm.get('location')?.setValue("");
    this.filterData();

  }


  selectState(stateId: any) {
    if (stateId) {
      this.getStateId = stateId
      let lgd = this.all_data_list.filter(function (lg: any) {
        return lg.State_Id === Number(stateId);
      }).map(function (lg: any) {
        return lg;
      })
      const key = 'City_Name';
      this.cityList = [...new Map(lgd.map((item: any) => [item[key], item])).values()]
      this.cityList = this.cityList.sort((a: any, b: any) =>
        a.City_Name !== b.City_Name ? (a.City_Name < b.City_Name ? -1 : 1) : 0
      );
      this.franchiseeList = [''];
      this.filterData();
    } else {
      this.india_country();
    }
  }

  selectCity(cityId: any) {
    if (cityId) {
      this.getCityId = cityId
      let lgd = this.all_data_list.filter(function (lg: any) {
        return lg.City_Id === Number(cityId);
      }).map(function (lg: any) {
        return lg;
      })
      const key = 'Franchisee_Name';
      this.franchiseeList = [...new Map(lgd.map((item: any) => [item[key], item])).values()]
      this.filterData();
    } else {
      this.selectState(this.searchForm.get('state')?.value);
    }
  }

  setcentrelist() {
    let dlenth = this.ucenterList.length;
    this.totalrecord = dlenth;
    if (dlenth > 50) {
      this.tindex = 50;
    }
    else {
      this.tindex = dlenth;
      this.more = false;
    }

    this.centerList = this.ucenterList.slice(this.findex, this.tindex);
  }
  setcentrelistclick() {
    let dlenth = this.ucenterList.length;
    let nindex = this.tindex + 50;

    if (dlenth > this.tindex) {


      if (nindex > dlenth) {
        this.tindex = dlenth;
        this.more = false;
      }
      else {
        this.tindex += 50;
      }
    }
    else {

      this.more = false;
    }

    this.centerList = this.ucenterList.slice(this.findex, this.tindex);
    //this.centerList=data;
  }
  selectLocation(locationId: any) {
    if (locationId) {
      this.getLocationId = locationId
      this.filterData();
    }
    else {
      this.selectCity(this.searchForm.get('city')?.value);
    }
  }

  filterData() {
    this.centerList = ['']
    if (this.getContryId != undefined) {
      this.lgd = this.all_data_list.filter((lg: any) => {
        return lg.Country_Id === Number(this.getContryId);
      }).map(function (lg: any) {
        return lg;
      })
      this.getContryId = undefined
    }

    if (this.getStateId != undefined) {

      this.lgd = this.all_data_list.filter((lg: any) => {
        return lg.State_Id === Number(this.getStateId);
      }).map(function (lg: any) {
        return lg;
      })
      this.getStateId = undefined

    }

    if (this.getCityId != undefined) {

      this.lgd = this.all_data_list.filter((lg: any) => {
        return lg.City_Id === Number(this.getCityId);
      }).map(function (lg: any) {
        return lg;
      })
      this.getCityId = undefined
    }

    if (this.getLocationId != undefined) {
      this.lgd = this.all_data_list.filter((lg: any) => {
        return lg.Franchisee_Code === this.getLocationId;
      }).map(function (lg: any) {
        return lg;
      })
      this.getLocationId = undefined
    }
    if (this.getZone != undefined) {
      this.lgd = this.all_data_list.filter((lg: any) => {
        return lg.zone === this.getZone;
      }).map(function (lg: any) {
        return lg;
      })
      this.getZone = undefined
    }
    this.ucenterList = this.lgd;
    this.setcentrelist();
  }
  openVirtualUrl(url: any) {
    this.virtual_url = this.sanitizer.bypassSecurityTrustResourceUrl(url)
  }
  setaddress(data: any) {
    // let jdata = {
    //   "franchisecode": data.Franchisee_Code
    // }
    // return this.apiService.checkMicrosite(jdata).subscribe({
    //   next: (resp: any) => {
    //     if (resp.data) {
    //       if (resp.data[0]?.url) {
    //         window.open(resp.data[0].url, "_blank");
    //       }
    //       else {
    //         this._service.savesession("uddixadd", this._service.setencrypt(JSON.stringify(data)));
    //         this.router.navigateByUrl('/admissions');
    //       }
    //     }
    //   },
    //   error: (error) => {
    //     console.log(error);
    //   }
    // })
    this.router.navigate(['/admissions', data?.Franchisee_Code])
  }

}
