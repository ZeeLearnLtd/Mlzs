import { Component, Inject, OnInit, PLATFORM_ID } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ProjectSeoService } from 'src/app/services/projectseo.service';
import { environment } from 'src/environments/environment';
import { ApicallService } from 'src/app/services/apicall.service';
import { stringify } from 'querystring';
import { ToastrService } from 'ngx-toastr';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CommonService } from '../service/common.service';
import { isPlatformBrowser } from '@angular/common';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-admissions',
  templateUrl: './admissions.component.html',
  styleUrls: ['./admissions.component.css']
})
export class AdmissionsComponent implements OnInit {
  headerTitle = "Admissions";
  otpInput: boolean = false
  otp_msg: any;
  otp_ValidMsg: boolean = false
  otp_inValidMsg: boolean = false
  segment: any
  stateContentDataList: any;
  stateId: any;
  selectCity: any;
  cityList: any;
  cityId: any;
  selectFranchisee: any;
  submitted: boolean = false
  franchiseeCode: any;
  selectClasslist: any;
  admissionForm: FormGroup;
  randomOtp: any;
  selectFranchiseeCode: any;
  selectedfranchisee_name: any
  classId: any;
  selectClassName: any;
  cityListName: any;
  _franchise_code: string = "";
  stateListName: any;
  constructor(private _activeRoute: ActivatedRoute, private spinner: NgxSpinnerService,
    @Inject(PLATFORM_ID) private platformId: Object,
    private projectService: ProjectSeoService, private router: Router,
    private fb: FormBuilder,
    private apiService: ApicallService,
    private toastr: ToastrService,
    private activatedRoute: ActivatedRoute, private common: CommonService) {
    this.admissionForm = fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      mobileNo: ['', [Validators.required, Validators.pattern("^((\\+91-?)|0)?[0-9]{10}$")]],
      state: ['', Validators.required],
      city: ['', Validators.required],
      class: ['', Validators.required],
      franchisee: ['', Validators.required],
      otp: ['', Validators.required],
      autorization: ['']
    })
  }
  ngOnInit(): void {
    this._franchise_code = this.activatedRoute.snapshot.paramMap.get('frcode')!;
    this.getAdmissionFormData();
    // const urlSegments = this.activatedRoute.snapshot.url;
    // this.segment = urlSegments[0]?.path;
    this._activeRoute.queryParams.subscribe(
      res => {
      }
    )
    this.getseo();
  }


  getseo() {
    this.spinner.show();
    let tbody = {
      slug: 'admissions',
      Projectid: environment.projectid,
    };
    this.apiService.getGetseo(tbody).subscribe((data: any) => {
      this.spinner.hide();
      this.projectService.sendMessagebread(data?.data?.breadcrumb);
      this.projectService.sendMessageblog(data?.data?.blog);
      this.projectService.sendMessageseo(data?.data?.testimony);
      this.projectService.sendMessageFaqs(data?.data?.faq);
      this.projectService.setmeta(data.data);
    });
    this.spinner.hide();
  }

  getAdmissionFormData() {
    this.apiService.getAllAdmissionData().subscribe((
      res => {
        this.stateContentDataList = res.root.subroot;
        if (this._franchise_code) {
          this.setaddress();
        }
      }
    ))
  }

  setaddress() {

    let alldata = this.stateContentDataList
    const filteredFranchisees = alldata.flatMap((state: any) => {
      const cities = Array.isArray(state.City) ? state.City : state.City ? [state.City] : [];

      return cities.flatMap((city: any) => {
        const franchisees = Array.isArray(city.Franchisee)
          ? city.Franchisee
          : city.Franchisee
            ? [city.Franchisee]
            : [];

        return franchisees.filter((fr: any) => fr.Address1 === this._franchise_code);
      });
    });

    let data

    if (filteredFranchisees.length) {
      data = filteredFranchisees[0];
      this.stateId = data?.State_Id;
      this.admissionForm.get('state')?.patchValue(data?.State_Id);
      this.admissionForm.get('state')?.disable();
      this.selectCity = this.stateContentDataList.filter((item: any) => {
        return item.State_ID == this.stateId
      })
      this.cityList = this.selectCity[0].City;

      if (typeof this.cityList.CityName === 'string') {
        this.cityList = [this.cityList];
      } else {
        this.cityList = this.cityList;
      }
      this.stateListName = this.stateContentDataList.filter((item: any) => {
        return item.State_ID == this.stateId
      })

      this.stateListName = this.stateListName[0].StateName

      this.cityId = data?.cityid;
      this.admissionForm.get('city')?.patchValue(data?.cityid);
      this.admissionForm.get('city')?.disable();
      this.selectFranchisee = this.cityList.filter((item: any) => {
        return item.CityID == this.cityId
      })
      if (Array.isArray(this.selectFranchisee[0].Franchisee)) {
        this.selectFranchisee = this.selectFranchisee[0].Franchisee
        this.selectFranchiseeCode = this.selectFranchisee[0].Franchisee_Code
        this.selectedfranchisee_name = this.selectFranchisee[0].Franchisee_Name
      } else {
        this.selectFranchisee = [this.selectFranchisee[0].Franchisee]
        this.selectFranchiseeCode = this.selectFranchisee[0].Franchisee_Code
        this.selectedfranchisee_name = this.selectFranchisee[0].Franchisee_Name
      }

      this.cityListName = this.cityList.filter((item: any) => {
        return item.CityID == this.cityId
      })

      this.cityListName = this.cityListName[0].CityName;

      this.franchiseeCode = data?.Franchisee_Code;

      this.selectClasslist = data?.classlist;
      this.admissionForm.get('franchisee')?.patchValue(data?.Franchisee_Code);
      this.admissionForm.get('franchisee')?.disable();
    }
  }

  onChangeState(id: any) {
    this.cityList = [];
    this.stateId = id.value;
    this.selectCity = this.stateContentDataList.filter((item: any) => {
      return item.State_ID == this.stateId
    })
    this.cityList = this.selectCity[0].City;

    if (typeof this.cityList.CityName === 'string') {
      this.cityList = [this.cityList];
    } else {
      this.cityList = this.cityList;
    }
    this.stateListName = this.stateContentDataList.filter((item: any) => {
      return item.State_ID == this.stateId
    })

    this.stateListName = this.stateListName[0].StateName
  }

  onChangeCity(id: any) {
    this.cityId = id.value;
    this.selectFranchisee = this.cityList.filter((item: any) => {
      return item.CityID == this.cityId
    })
    this.selectFranchisee = [this.selectFranchisee[0].Franchisee]
    this.selectFranchiseeCode = this.selectFranchisee[0].Franchisee_Code
    this.selectedfranchisee_name = this.selectFranchisee[0].Franchisee_Name
    this.cityListName = this.cityList.filter((item: any) => {
      return item.CityID == this.cityId
    })

    this.cityListName = this.cityListName[0].CityName
  }
  onChangeFranchisee(id: any) {
    this.franchiseeCode = id.value;
    this.selectClasslist = this.selectFranchisee.filter((item: any) => {
      return item.Franchisee_Code == this.franchiseeCode
    })
    this.selectClasslist = this.selectClasslist[0].classlist
  }

  onchangeClass(id: any) {
    this.classId = id.value
    this.selectClassName = this.selectClasslist.filter((item: any) => {
      return item.SchoolClassID == this.classId
    })
    this.selectClassName = this.selectClassName[0].ClassName
  }

  get f() {
    return this.admissionForm.controls;
  }
  validationForm() {
    this.submitted = true;
    if (this.admissionForm.invalid) {
      return;
    } else {
      this.onSubmit()
    }

  }
  onSubmit() {
    let obj = {
      "utm_medium": "Website",
      "utm_source": "Website",
      "utm_compaign": "Website",
      "utm_term": null,
      "utm_content": null,
      "utm_ad": null,
      "gclid": null,
      "Type": "P",
      "Source": "Website",
      "FirstName": this.admissionForm.get('name')?.value,
      "Email": this.admissionForm.get('email')?.value,
      "Mobile": this.admissionForm.get('mobileNo')?.value,
      "State": this.stateListName,
      "City": this.cityListName,
      "LocationId": this.selectFranchiseeCode,
      "class": this.selectClassName,
      "ClassId": this.admissionForm.get('class')?.value,
      "ProjectId": "3607",
      "Location": this.selectedfranchisee_name,
      "Location_name": this.selectedfranchisee_name,//this.admissionForm.get('franchisee')?.value,
      "Country": "India",
      "Product": "259262000039670041"
    }
    this.spinner.show();
    this.apiService.postAdmissionForm(obj).subscribe(
      res => {
        this.spinner.hide();
        this.toastr.success('Admission submit successfully!');
        this.otp_ValidMsg = false;
        this.otp_inValidMsg = false;
        this.router.navigate(['admission/thankyou'])
        this.admissionForm.reset();
        this.submitted = false
      }
    )
    this.spinner.hide();
  }

  getMobileNO() {
    if ((this.admissionForm.get('mobileNo')?.value).length == 10) {
      this.sendMobNO();
    }
  }

  sendMobNO() {
    this.randomOtp = Math.floor(1000 + Math.random() * 9000);
    let mobNo = {
      "MobileNo": this.admissionForm.get('mobileNo')?.value,
      "smsText": `To validate your interest in the MLZS Franchise, your OTP is ${this.randomOtp}` + `. Think Education. Think Zee Learn.`,
      "sResponse": "",
      "header": "ZLMLZS"
    }

    this.apiService.getOtp(mobNo).subscribe(

      res => {
        this.otpInput = true;
      },
      error => {
      }
    )
  }

  verifyOTP() {
    if ((this.admissionForm.get('otp')?.value).length == 4) {
      if (this.randomOtp == this.admissionForm.get('otp')?.value) {
        this.otp_ValidMsg = true;
        this.otp_inValidMsg = false;
      } else {
        this.otp_inValidMsg = true;
        this.otp_ValidMsg = false;
      }
    }
  }
}
