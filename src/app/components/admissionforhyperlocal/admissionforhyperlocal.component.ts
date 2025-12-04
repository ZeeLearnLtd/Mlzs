import { Component, OnInit, AfterViewInit, PLATFORM_ID, Inject, Input } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CommonService } from '../service/common.service';
import { ActivatedRoute, Router, Params } from '@angular/router';
import { NgxSpinnerService } from "ngx-spinner";
import { isPlatformBrowser } from '@angular/common';

@Component({
  selector: 'app-admissionforhyperlocal',
  templateUrl: './admissionforhyperlocal.component.html',
  styleUrls: ['./admissionforhyperlocal.component.css']
})
export class AdmissionforhyperlocalComponent {
  @Input() state:string="";
  @Input() city:string="";
  @Input() inputdata:any;
  admissionForm: FormGroup;
  submitted = false;
  randomOtp: any;
  otpInput: boolean = false
  otp_msg: any;
  otp_ValidMsg: boolean = false
  otp_inValidMsg: boolean = false
  countryList: any;
  stateList: any;
  cityList: any;
  selectedDevice: string = "";
  franchiseeList: any;
  studentID: any;
  program_id: any;
  gen_captcha: any;
  filterFranchisee: any;
  locationName: any;
  selectedcountry: string = "";
  selectedstate: string = "";
  selectedCity: string = "";
  selectedpincode: string = "";
  franchiseeMobileNo: string = "";
  form_title: boolean = true;
  generatedcaptcha: string = "";
  alldata:any=[]
  captchaText: any = []
  indiaCountry:any=[];
  captchaEntered: String = ""
  classId: any;
  selectClassName: any;
  ucenterList:any=[];
   selectFranchisee: any;
  ifLoader: boolean = false;
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
  constructor(
    @Inject(PLATFORM_ID) private platformId: Object, private fb: FormBuilder, private _servie: CommonService, private ngxSpinner: NgxSpinnerService,
    private activatedRoute: ActivatedRoute,private _activeRoute: ActivatedRoute, private router: Router) {
    this.admissionForm = fb.group({
      name: ['', Validators.required],
      // lname: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      mobileNo: ['', [Validators.required, Validators.pattern("^((\\+91-?)|0)?[0-9]{10}$")]],
      pinCode: ['', [Validators.required, Validators.pattern("^((\\+91-?)|0)?[0-9]{6}$")]],
      country: ['', Validators.required],
      state: ['', Validators.required],
      city: ['', Validators.required],
      otp: ['', Validators.required],
      class:['',Validators.required],
      franchisee: ['', Validators.required]
    })

  }

  ngOnInit(): void {
    //this.generateCAPTCHA(); 
    if(this.inputdata.length>0){
      this.alldata=this.inputdata;
      this.india_country();
    }
    this.createCaptcha();
    // this.selectCountry_State_cityList();
    //

  }
  get f() {
    return this.admissionForm.controls;
  }
  
  india_country() {
    let lgd = this.alldata.filter(function (lg: any) {
      return lg.Country_Name === "India";
    }).map(function (lg: any) {
      return lg;
    })
    const key = 'India';
    this.indiaCountry = [...new Map(lgd.map((item: any) => [item[key], item])).values()]
    
    let lgd1 = this.alldata.filter((lg: any) => {
      return lg.Country_Id === Number(this.indiaCountry[0].Country_Id);
    }).map(function (lg: any) {
      return lg;
    })
    const key1 = 'State_Name';
    this.stateList = [...new Map(lgd.map((item: any) => [item[key1], item])).values()]
    this.admissionForm.get('state')?.patchValue(this.stateList[0].State_Id)
    this.stateList = this.stateList.sort((a: any, b: any) =>
      a.State_Name !== b.State_Name ? (a.State_Name < b.State_Name ? -1 : 1) : 0
    );
    this.ucenterList = lgd1;
    this.selectState(this.stateList[0]?.State_Id)
    if(this.state && this.state!=""){
      this.admissionForm.get('state')?.disable();
    } 
    if(this.city && this.city!=""){
      this.admissionForm.get('city')?.patchValue(this.stateList[0]?.City_Id);
      this.selectCity(this.stateList[0]?.City_Id);      
      this.admissionForm.get('city')?.disable();
    }
    
  }

   onChangeFranchisee(id: any) {
    this.franchiseeCode = this.admissionForm.get('franchisee')?.value!;
    // if (!Array.isArray(this.filterFranchisee[0].Franchisee)) {
    //   this.franchiseeList = [this.filterFranchisee[0].Franchisee];
    //   this.locationName = this.franchiseeList[0].Franchisee_Name;
    //   this.franchiseeMobileNo = this.franchiseeList[0].Mobile_No;
    // }
    // else 
      if(this.franchiseeCode){
      this.franchiseeList = this.filterFranchisee[0].Franchisee;
      let dt = this.franchiseeList.filter((dt: any) => {
        return dt.Franchisee_Code ==  this.franchiseeCode
      }).map((obj: any) => {
        return obj
      })
      this.locationName = dt[0].Franchisee_Name;
      this.franchiseeMobileNo = dt[0].Mobile_No;
    }
    // this.selectClasslist = this.selectFranchisee.filter((item: any) => {
    //   return item.Franchisee_Code == this.franchiseeCode
    // })
    // this.selectClasslist = this.selectClasslist[0].classlist
  }

  selectState(stateId: any) {
    if (stateId) {
      let lgd = this.alldata.filter(function (lg: any) {
        return lg.State_Id === Number(stateId);
      }).map(function (lg: any) {
        return lg;
      })
      const key = 'City_Name';
      this.cityList = [...new Map(lgd.map((item: any) => [item[key], item])).values()]
      this.cityList = this.cityList.sort((a: any, b: any) =>
        a.City_Name !== b.City_Name ? (a.City_Name < b.City_Name ? -1 : 1) : 0
      );
      
    } else {
      this.india_country();
    }
  }

  selectCity(cityId: any) {
    let city = this.admissionForm.get('city')?.value;
    if (city) {
     
      let lgd = this.alldata.filter(function (lg: any) {
        return lg.City_Id === Number(city);
      }).map(function (lg: any) {
        return lg;
      })
      const key = 'Franchisee_Name';
      this.selectFranchisee = [...new Map(lgd.map((item: any) => [item[key], item])).values()]
      this.admissionForm.get('class')?.patchValue('');
      
    } else {
      this.selectState(this.admissionForm.get('state')?.value);
    }
  }
    onchangeClass(id: any) {
    this.classId = id.value
    this.selectClassName = this.selectClasslist.filter((item: any) => {
      return item.SchoolClassID == this.classId
    })
    this.selectClassName = this.selectClassName[0].ClassName
  }
// selectCity(selectVal: any) {
//     let city = selectVal.target.value
//     this.filterFranchisee = this.cityList.filter((x: any) => {
//       return x.City_Name == city
//     })
//     if (!Array.isArray(this.filterFranchisee[0].Franchisee)) {
//       this.franchiseeList = [this.filterFranchisee[0].Franchisee]
//     }
//     else {
//       this.franchiseeList = this.filterFranchisee[0].Franchisee
//     }

//   }

  // setaddress(data: any) {
  //   let filterState = this.countryList.filter((x: any) => {
  //     return x.Country_Name == data.Country_Name;
  //   });

  //   this.stateList = filterState[0].State;
  //   this.selectedcountry = data.Country_Name;

  //   let filterCity = this.stateList.filter((x: any) => {
  //     return x.State_Name == data.State_Name
  //   })
  //   this.cityList = filterCity[0].City
  //   this.selectedstate = data.State_Name;


  //   this.filterFranchisee = this.cityList.filter((x: any) => {
  //     return x.City_Name == data.City_Name
  //   })
  //   this.selectedCity = data.City_Name;

  //   if (!Array.isArray(this.filterFranchisee[0].Franchisee)) {
  //     this.franchiseeList = [this.filterFranchisee[0].Franchisee];
  //     this.locationName = this.franchiseeList[0].Franchisee_Name;
  //     this.franchiseeMobileNo = this.franchiseeList[0].Mobile_No;
  //   }
  //   else {
  //     this.franchiseeList = this.filterFranchisee[0].Franchisee;
  //     let dt = this.franchiseeList.filter((dt: any) => {
  //       return dt.Franchisee_Code == data.Franchisee_Code
  //     }).map((obj: any) => {
  //       return obj
  //     })
  //     this.locationName = dt[0].Franchisee_Name;
  //     this.franchiseeMobileNo = dt[0].Mobile_No;

  //   }

  //   this.selectedpincode = data.Pin_Code;
  //   this.selectedDevice = data.Franchisee_Code;
  //   //this.locationName=this.franchiseeList[0].Franchisee_Name;
  //   if (isPlatformBrowser(this.platformId)) {
  //     window.sessionStorage.removeItem('uddixadd');
  //   }
  // }

  validationForm() {
    this.submitted = true;

    if (this.admissionForm.valid) {
      this.submit_captcha();
    } else {
      //this.submit_captcha();
    }

  }

  submitForm() {
    if ((this.admissionForm.get('otp')?.value).length == 4) {
      if (this.randomOtp == this.admissionForm.get('otp')?.value) {
        this.ngxSpinner.show();
        let obj = {
          // "City": this.admissionForm.get('city')?.value,
          // "Country": this.admissionForm.get('country')?.value,
          // "Email": this.admissionForm.get('email')?.value,
          // "FirstName": this.admissionForm.get('fname')?.value,
          // "HaveSpace": "",
          // "LastName": this.admissionForm.get('lname')?.value,
          // "Location": this.admissionForm.get('location')?.value,
          // "LocationId": this.admissionForm.get('location')?.value,
          // "Mobile": this.admissionForm.get('mobile')?.value,
          // "PinCode": this.admissionForm.get('pinCode')?.value,
          // "Product": "259262000004729208",
          // "ProjectId": "1",
          // "SoonStartsIn": "",
          // "Source": "gclid",
          // "gclid": "gclid",
          // "State": this.admissionForm.get('state')?.value,
          // "Type": "P",
          // "WillingToInvest": "",
          // "utm_compaign": "Website",
          // "utm_medium": "Website",
          // "utm_source": "Website",
          // "utm_ad": "Website",
          // "utm_Content": "Website",
          // "utm_Term": "Website",


          "City": this.admissionForm.get('city')?.value,
          "Country": this.admissionForm.get('country')?.value,
          "Email": this.admissionForm.get('email')?.value,
          "FirstName": this.admissionForm.get('name')?.value,
          "HaveSpace": "",
          "LastName": this.admissionForm.get('name')?.value,
          "Location": this.admissionForm.get('franchisee')?.value,
          "Location_name": this.locationName,
          "Mobile": this.admissionForm.get('mobileNo')?.value,
          "PinCode": this.admissionForm.get('pinCode')?.value,
          "class":this.admissionForm.get('class')?.value,
          "Product": "259262000004729208",
          "ProjectId": "1",
          "SoonStartsIn": "",
          "Source": "gclid",
          "gclid": "gclid",
          "State": this.admissionForm.get('state')?.value,
          "Type": "P",
          "WillingToInvest": "",
          "utm_compaign": "Website",
          "utm_medium": "Website",
          "utm_source": "Website",
          "utm_ad": "Website",
          "utm_Content": "Website",
          "utm_Term": "Website",
          "Stream": "",
          "Franchise_Mobile": this.franchiseeMobileNo
        }
        this._servie.saveData(obj).subscribe(
          res => {
            this.ngxSpinner.hide();
            this.otp_ValidMsg = false;
            this.otp_inValidMsg = false;
            this.router.navigate(['admission/thankyou'])
            this.admissionForm.reset();
            this.submitted = false
          },
          error => {
            this.ngxSpinner.hide();
            console.log(error);
          }
        )

        this.otp_ValidMsg = true;
        this.otp_inValidMsg = false;

      } else {
        alert('Please Enter Valid OTP')
        this.otp_inValidMsg = true;
        this.otp_ValidMsg = false;
      }
    }


  }
  selectCentet(getCenter: any) {

    if (!Array.isArray(this.filterFranchisee[0].Franchisee)) {
      this.franchiseeList = [this.filterFranchisee[0].Franchisee];
      this.locationName = this.franchiseeList[0].Franchisee_Name;
      this.franchiseeMobileNo = this.franchiseeList[0].Mobile_No;
    }
    else {
      this.franchiseeList = this.filterFranchisee[0].Franchisee;
      let dt = this.franchiseeList.filter((dt: any) => {
        return dt.Franchisee_Code == getCenter
      }).map((obj: any) => {
        return obj
      })
      this.locationName = dt[0].Franchisee_Name;
      this.franchiseeMobileNo = dt[0].Mobile_No;
    }
  }


  getMobileNO() {
    if ((this.admissionForm.get('mobile')?.value).length == 10) {
      this.sendMobNO();
    }
  }

  sendMobNO() {
    this.ngxSpinner.show();
    this.randomOtp = Math.floor(1000 + Math.random() * 9000);
    let mobNo = {
      "MobileNo": this.admissionForm.get('mobile')?.value,
      "smsText": `Your Kidzee Verification code is : ${this.randomOtp}`,
      "sResponse": ""
    }
    this._servie.getOtp(mobNo).subscribe(
      res => {
        this.ngxSpinner.hide();
        this.otpInput = true;
      },
      error => {
        this.ngxSpinner.hide();
        console.log(error);
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

  selectCountry_State_cityList() {
    // this._servie.getState_countryList().subscribe(
    //   res => {
    //     this.countryList = res.root.subroot;
    //     let address = this._servie.getencrypt(this._servie.getsession("uddixadd")!);
    //     if (this._servie.getsession("uddixadd")!) {
    //       let dt = JSON.parse(address);
    //       this.setaddress(dt);
    //     }
    //   })
    
  }

  selectCountry(selectVal: any) {
    //let country = selectVal.target.value
    let filterState = this.countryList.filter((x: any) => {
      return x.Country_Name == selectVal
    })

    this.stateList = filterState[0].State
  }

  // selectState(selectVal: any) {
  //   let state = selectVal.target.value
  //   let filterCity = this.stateList.filter((x: any) => {
  //     return x.State_Name == state
  //   })
  //   this.cityList = filterCity[0].City
  // }

  

  generateCAPTCHA() {
    "use strict";

    var chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789",

      CAPTCHALength = 6,

      randomCAPTCHA = "",

      i,

      randomNumber;

    for (i = 0; i < CAPTCHALength; i = i + 1) {

      randomNumber = Math.floor(Math.random() * chars.length);

      randomCAPTCHA += chars.substring(randomNumber, randomNumber + 1);
      this.gen_captcha = randomCAPTCHA;
      (document.getElementById("CAPTCHA") as HTMLInputElement).innerHTML = this.gen_captcha;
      //this.generatedcaptcha=this.gen_captcha;
    }
  }


  createCaptcha() {
    let possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789"
    const lengthOfCode = 1

    for (let i = 0; i < 6; i++) {
      let captchaChar = this.makeRandom(lengthOfCode, possible)
      this.captchaText[i] = captchaChar
    }
    this.gen_captcha = this.captchaText.join('').toString();
  }
  makeRandom(lengthOfCode: number, possible: string) {
    let text = "";
    for (let i = 0; i < lengthOfCode; i++) {
      text += possible.charAt(Math.floor(Math.random() * possible.length));
    }
    return text;
  }


  // captcha function

  submit_captcha() {
    if ((document.getElementById("input") as HTMLInputElement).value === "") {

      (document.getElementById("wrong") as HTMLInputElement).style.display = "block";

      (document.getElementById("done") as HTMLInputElement).style.display = "none";

      (document.getElementById("wrong") as HTMLInputElement).innerHTML = "This Field Can't Be Empty";
      this.generateCAPTCHA();

    } else if ((document.getElementById("input") as HTMLInputElement).value !== this.gen_captcha) {
      (document.getElementById("done") as HTMLInputElement).style.display = "none";

      (document.getElementById("wrong") as HTMLInputElement).style.display = "block";

      (document.getElementById("wrong") as HTMLInputElement).innerHTML = "Try Again";

      (document.getElementById("input") as HTMLInputElement).value = "";

      this.generateCAPTCHA();

    } else {
      (document.getElementById("wrong") as HTMLInputElement).style.display = 'none'
      this.submitForm();
    }
  }
}
