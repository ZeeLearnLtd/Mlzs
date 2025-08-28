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
  selector: 'app-contect-us',
  templateUrl: './contect-us.component.html',
  styleUrls: ['./contect-us.component.css']
})
export class ContectUsComponent {
  headerTitle = "Contect Us"
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
  submitted: boolean = false
  indiaCountry: any = [];
  searchForm: FormGroup;
  findex: number = 0;
  tindex: number = 50
  totalrecord: number = 0;
  virtual_url: any;
  enquireForm: FormGroup
  segment: any

  constructor(
    @Inject(PLATFORM_ID) private platformId: Object,
    private _service: CommonService,
    private fb: FormBuilder,
    private ngxSpinner: NgxSpinnerService,
    public sanitizer: DomSanitizer,
    private projectService: ProjectSeoService, private router: Router,
    private apiService: ApicallService,
    private activatedRoute: ActivatedRoute) {
    this.searchForm = fb.group({
      country: [''],
      city: [''],
      state: [''],
      location: [''],
    })
    this.enquireForm = fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      mobile: ['', [Validators.required, Validators.pattern("^((\\+91-?)|0)?[0-9]{10}$")]],
      massege: ['', Validators.required],
    })
  }

  ngOnInit(): void {
    const urlSegments = this.activatedRoute.snapshot.url;
    this.segment = urlSegments[0]?.path;

    if (this.segment == 'contect-us') {
      (document.getElementById('school_id') as HTMLElement).style.display = 'none'
    }

    this.tindex = 50;
    this.getseo();
  }

  getseo() {
    let tbody = {
      slug: 'contact-us',
      Projectid: environment.projectid,
    };
    this.apiService.getGetseo(tbody).subscribe((data: any) => {
      this.getAllDataList();
      if (data.data != undefined) {
        this.projectService.sendMessagebread(data.data.breadcrumb);
        this.projectService.sendMessageblog(data.data.blog);
        this.projectService.sendMessageseo(data.data.testimony);
        this.projectService.setmeta(data.data);
      }
    });
  }
  getAllDataList() {
    // this.ngxSpinner.show();
    // this._service.get_allCountryList().subscribe(
    //   res => {
    //     this.ngxSpinner.hide();
    //     this.all_data_list = res
    //     this.india_country();
    //     this.setcountry();
    //   }
    // )
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

  selectCountry(contryId: any) {
    // this.ngxSpinner.show();
    this.getContryId = contryId
    let lgd = this.all_data_list.filter(function (lg: any) {
      return lg.Country_Id === Number(contryId);
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
    this.filterData();
  }

  selectCity(cityId: any) {
    this.getCityId = cityId
    let lgd = this.all_data_list.filter(function (lg: any) {
      return lg.City_Id === Number(cityId);
    }).map(function (lg: any) {
      return lg;
    })
    const key = 'Franchisee_Name';
    this.franchiseeList = [...new Map(lgd.map((item: any) => [item[key], item])).values()]
    this.filterData();
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
    this.getLocationId = locationId
    this.filterData();
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
    this.ucenterList = this.lgd;
    this.setcentrelist();
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
            if (isPlatformBrowser(this.platformId)) {
              this._service.savesession("uddixadd", this._service.setencrypt(JSON.stringify(data)));
              this.router.navigateByUrl('/admissions');
            }
          }
        }
      },
      error: (error) => {
        console.log(error);
      }
    })

  }

  get f() {
    return this.enquireForm.controls;
  }

  validationForm() {
    this.submitted = true;
    if (this.enquireForm.invalid) {
      return;
    } else {
      this.submitForm()
    }

  }

  submitForm() {
    let obj = {
      "City": '',
      "Country": "India",
      "Email": this.enquireForm.get('email')?.value,
      "FirstName": this.enquireForm.get('name')?.value,
      "HaveSpace": "",
      "LastName": '',
      "Location": "",
      "Mobile": this.enquireForm.get('mobile')?.value,
      "PinCode": '',
      "Product": "0",
      "ProjectId": "3607",
      "SoonStartsIn": "",
      "Source": "gclid",
      "gclid": "gclid",
      "State": '',
      "Type": "F",
      "WillingToInvest": "",
      "utm_compaign": "Website",
      "utm_medium": "Website",
      "utm_source": "Website",
      "utm_ad": "Website",
      "utm_Content": "Website",
      "utm_Term": "Website",
    }

    this.apiService.saveEnquiryData(obj).subscribe(
      res => {

        alert(res);
      }
    )
  }


}
