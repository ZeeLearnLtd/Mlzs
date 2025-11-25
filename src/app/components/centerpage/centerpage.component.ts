import { Component, Inject, OnInit, PLATFORM_ID } from '@angular/core';
import { ActivatedRoute, Router, UrlSegment } from '@angular/router';
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
  selector: 'app-centerpage',
  templateUrl: './centerpage.component.html',
  styleUrls: ['./centerpage.component.css']
})
export class CenterpageComponent {
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
  selectClasslist: any = [
    { SchoolClassID: 5, ClassName: 'CLASS 1' },
    { SchoolClassID: 6, ClassName: 'CLASS 2' },
    { SchoolClassID: 7, ClassName: 'CLASS 3' },
    { SchoolClassID: 8, ClassName: 'CLASS 4' },
    { SchoolClassID: 9, ClassName: 'CLASS 5' },
    { SchoolClassID: 10, ClassName: 'CLASS 6' },
    { SchoolClassID: 11, ClassName: 'CLASS 7' },
    { SchoolClassID: 12, ClassName: 'CLASS 8' },
    { SchoolClassID: 13, ClassName: 'CLASS 9' },
    { SchoolClassID: 14, ClassName: 'CLASS 10' },
    { SchoolClassID: 15, ClassName: 'CLASS 11 – Science' },
    { SchoolClassID: 16, ClassName: 'CLASS 11 – Commerce' },
    { SchoolClassID: 17, ClassName: 'CLASS 11 – Arts' },
    { SchoolClassID: 18, ClassName: 'CLASS 12 – Science' },
    { SchoolClassID: 19, ClassName: 'CLASS 12 – Commerce' },
    { SchoolClassID: 20, ClassName: 'CLASS 12 – Arts' },
  ];
  admissionForm: FormGroup;
  randomOtp: any;
  selectFranchiseeCode: any;
  selectedfranchisee_name: any
  classId: any;
  selectClassName: any;
  cityListName: any;
  _franchise_code: string = "";
  stateListName: any;
  ifLoader: boolean = false;
  centerdatabyslug: any = [];
  constructor(private _activeRoute: ActivatedRoute, private spinner: NgxSpinnerService,
    @Inject(PLATFORM_ID) private platformId: Object,
    private projectService: ProjectSeoService, private router: Router,
    private fb: FormBuilder,
    private apiService: ApicallService,
    private toastr: ToastrService,
    private activatedRoute: ActivatedRoute,
    private common: CommonService) {
    this.admissionForm = fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      mobileNo: ['', [Validators.required, Validators.pattern("^((\\+91-?)|0)?[0-9]{10}$")]],
      state: [''],
      city: [''],
      class: ['', Validators.required],
      franchisee: [''],
      otp: ['', Validators.required],
      // autorization: ['']
    })
  }
  ngOnInit(): void {
    this._franchise_code = this.activatedRoute.snapshot.paramMap.get('frcode')!;
    this.activatedRoute.url.subscribe((urlSegments: UrlSegment[]) => {
      // Skip the first "admissions"
      const parts = urlSegments.map(s => s.path);
      if (parts.length === 0) {
        return;
      }

      const value = parts.join('/');

      this.get_centerdatabyslug(value);
    });
    //this.getAdmissionFormData();
    // const urlSegments = this.activatedRoute.snapshot.url;
    // this.segment = urlSegments[0]?.path;
    this._activeRoute.queryParams.subscribe(
      res => {
      }
    )

  }


  getseo(slug: string) {
    this.spinner.show();
    let tbody = {
      slug: slug,
      Projectid: environment.projectid,
    };
    this.apiService.getGetseo(tbody).subscribe((data: any) => {
      this.spinner.hide();
      if (data?.data?.breadcrumb) {
        this.projectService.sendMessagebread(data?.data?.breadcrumb);
      }
      if (data?.data?.blog) {
        this.projectService.sendMessageblog(data?.data?.blog);
      }
      if (data?.data?.testimony) {
        this.projectService.sendMessageseo(data?.data?.testimony);
      }
      if (data?.data?.faq) {
        this.projectService.sendMessageFaqs(data?.data?.faq);
      }
      this.projectService.setmeta(data.data);
    });
    this.spinner.hide();
  }


  get_centerdatabyslug(slug: string) {
    let input = {
      "slug": slug
    }
    this.common.get_centerdatabyslug(input).subscribe((
      res => {
        this.centerdatabyslug = res;
        this.getseo(slug);
        this.setaddress();
        // if (this._franchise_code) {
        //  
        // }
      }
    ))
  }

  setaddress() {

    if (this.centerdatabyslug.length == 1) {
      let data = this.centerdatabyslug[0];

      this.admissionForm.get('state')?.patchValue(data?.State_Id);
      this.stateListName = data?.State_Name
      this.admissionForm.get('state')?.disable();

      this.admissionForm.get('city')?.patchValue(data?.City_Id);
      this.cityListName = data?.City_Name
      this.admissionForm.get('city')?.disable();

      this.franchiseeCode = data?.Franchisee_Code;
      this.admissionForm.get('franchisee')?.patchValue(data?.Franchisee_Code);
      this.admissionForm.get('franchisee')?.disable();
      this.selectFranchiseeCode = data.ep_School_Innova_Id;
      this.selectedfranchisee_name = data?.Franchisee_Name;

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
      console.log(this.admissionForm.controls)
      return;
    } else {
      this.onSubmit()
    }

  }
  onSubmit() {
    this.ifLoader = true;
    this.spinner.show();
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

    this.apiService.postAdmissionForm(obj).subscribe(
      res => {
        this.spinner.hide();
        this.toastr.success('Request submit successfully!');
        this.ifLoader = false;
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
      "smsText": `To validate your interest in MLZS Admission, your OTP is ${this.randomOtp}. Think Education. Think Zee Learn.`,
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

