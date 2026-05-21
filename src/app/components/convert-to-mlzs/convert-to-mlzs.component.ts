import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ProjectSeoService } from 'src/app/services/projectseo.service';
import { environment } from 'src/environments/environment';
import { ApicallService } from 'src/app/services/apicall.service';
import { stringify } from 'querystring';
import { ToastrService } from 'ngx-toastr';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
@Component({
  selector: 'app-convert-to-mlzs',
  templateUrl: './convert-to-mlzs.component.html',
  styleUrls: ['./convert-to-mlzs.component.css']
})
export class ConvertToMLZSComponent {
  ifLoader: boolean = false;
  captchaText: string = '';
  captchaForm!: FormGroup;
  captchaValid: boolean | null = null;
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
  classId: any;
  selectClassName: any;
  cityListName: any;
  stateListName: any;
  cityName: any;
  constructor(private _activeRoute: ActivatedRoute,
    private projectService: ProjectSeoService, private router: Router,
    private fb: FormBuilder,
    private apiService: ApicallService,
    private toastr: ToastrService,
    private activatedRoute: ActivatedRoute) {
    this.admissionForm = fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      mobileNo: ['', [Validators.required, Validators.pattern("^((\\+91-?)|0)?[0-9]{10}$")]],
      state: ['', Validators.required],
      city: ['', Validators.required],
      schoolURL: ['', Validators.required],
      schoolName: ['', Validators.required],
      schoolCity: ['', Validators.required],
      schoolLocality: ['', Validators.required],
      otp: ['', Validators.required],
      captchaInput: ['', Validators.required]
    })
  }
  ngOnInit(): void {
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
    let tbody = {
      slug: 'convert-to-an-mlzs',
      Projectid: environment.projectid,
    };
    this.apiService.getGetseo(tbody).subscribe((data: any) => {
      this.projectService.sendMessagebread(data?.data?.breadcrumb);
      this.projectService.sendMessageblog(data?.data?.blog);
      this.projectService.sendMessageseo(data?.data?.testimony);
      this.projectService.sendMessageFaqs(data?.data?.faq);
      this.projectService.setmeta(data.data);
    });
  }

  getAdmissionFormData() {
    this.generateCaptcha();
    this.apiService.getAllAdmissionData().subscribe((
      res => {
        this.stateContentDataList = res.root.subroot;
      }
    ))
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

  // onChangeCity(id: any) {
  //   this.cityId = id.value;
  //   this.selectFranchisee = this.cityList.filter((item: any) => {
  //     return item.CityID == this.cityId
  //   })
  //   this.selectFranchisee = [this.selectFranchisee[0].Franchisee]
  //   this.selectFranchiseeCode = this.selectFranchisee[0].Franchisee_Code
  //   this.cityListName = this.cityList.filter((item: any) => {
  //     return item.CityID == this.cityId
  //   })

  //   this.cityListName = this.cityListName[0].CityName
  // }
  // onChangeFranchisee(id: any) {
  //   this.franchiseeCode = id.value;
  //   this.selectClasslist = this.selectFranchisee.filter((item: any) => {
  //     return item.Franchisee_Code == this.franchiseeCode
  //   })
  //   this.selectClasslist = this.selectClasslist[0].classlist
  // }

  onchangeClass(id: any) {
    this.classId = id.value
    this.selectClassName = this.selectClasslist.filter((item: any) => {
      return item.SchoolClassID == this.classId
    })
    this.selectClassName = this.selectClassName[0].ClassName
  }
  onchangeCity(cityId: any) {
    this.cityId = cityId.value;
    let cityList = this.cityList.filter((x: any) => {
      return this.cityId == x.CityID
    })
    this.cityName = cityList[0].CityName
    console.log('cityid', this.cityId);
    console.log('cityList', cityList);
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
    this.ifLoader = true;
    let obj = {
      "FirstName": this.admissionForm.get('name')?.value,
      "LastName": "-",
      "Email": this.admissionForm.get('email')?.value,
      "Mobile": this.admissionForm.get('mobileNo')?.value,
      "class": "",
      // classId: formData.classId,
      "PinCode": "",
      "State": this.stateListName,
      "City": this.cityName,
      "Country": "India",
      "HaveSpace": "",
      "Location": "",
      "Location_name": "",
      "Product": "259262000000213037",
      "ProjectId": "3607",
      "SoonStartsIn": "",
      "Source": "Website",
      "Type": "F",
      "WillingToInvest": "",
      "gclid": "",
      "utm_compaign": "Website",
      "utm_medium": "Website",
      "utm_source": "Website",
      "utm_ad": "Website",
      "utm_Content": "Website",
      "utm_Term": "Website",
      "DB_Sync": "Yes",
    }
    this.apiService.savefranchiseeData(obj).subscribe(
      res => {
        this.toastr.success('Request submit successfully!');
        this.ifLoader = true;
        this.otp_ValidMsg = false;
        this.otp_inValidMsg = false;
        this.router.navigate(['franchise/thankyou'])
        this.admissionForm.reset();
        this.submitted = false
      }
    )
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

  generateCaptcha(): void {
    const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnpqrstuvwxyz23456789';
    this.captchaText = '';
    for (let i = 0; i < 6; i++) {
      this.captchaText += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    this.captchaValid = null;
  }

  verifyCaptcha(): void {
    const input = this.captchaForm.get('captchaInput')?.value;
    this.captchaValid = input === this.captchaText;
  }
}
