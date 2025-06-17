import { Component, OnInit, AfterViewInit, PLATFORM_ID, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CommonService } from '../service/common.service';
import { ActivatedRoute, Router, Params } from '@angular/router';
import { NgxSpinnerService } from "ngx-spinner";
import { isPlatformBrowser } from '@angular/common';
@Component({
  selector: 'app-admissions-form',
  templateUrl: './admissions-form.component.html',
  styleUrls: ['./admissions-form.component.css']
})
export class AdmissionsFormComponent implements OnInit {
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
  captchaText: any = []
  captchaEntered: String = ""
  constructor(
    @Inject(PLATFORM_ID) private platformId: Object, private fb: FormBuilder, private _servie: CommonService, private ngxSpinner: NgxSpinnerService,
    private activatedRoute: ActivatedRoute, private _activeRoute: ActivatedRoute, private router: Router) {
    this.admissionForm = fb.group({
      fname: ['', Validators.required],
      lname: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      mobile: ['', [Validators.required, Validators.pattern("^((\\+91-?)|0)?[0-9]{10}$")]],
      pinCode: ['', [Validators.required, Validators.pattern("^((\\+91-?)|0)?[0-9]{6}$")]],
      country: ['', Validators.required],
      state: ['', Validators.required],
      city: ['', Validators.required],
      otp: ['', Validators.required],
      location: ['', Validators.required]
    })

  }

  ngOnInit(): void {
    //this.generateCAPTCHA(); 
    this.createCaptcha();
    this.selectCountry_State_cityList();
    //

  }
  get f() {
    return this.admissionForm.controls;
  }

  setaddress(data: any) {
    let filterState = this.countryList.filter((x: any) => {
      return x.Country_Name == data.Country_Name;
    });

    this.stateList = filterState[0].State;
    this.selectedcountry = data.Country_Name;

    let filterCity = this.stateList.filter((x: any) => {
      return x.State_Name == data.State_Name
    })
    this.cityList = filterCity[0].City
    this.selectedstate = data.State_Name;


    this.filterFranchisee = this.cityList.filter((x: any) => {
      return x.City_Name == data.City_Name
    })
    this.selectedCity = data.City_Name;

    if (!Array.isArray(this.filterFranchisee[0].Franchisee)) {
      this.franchiseeList = [this.filterFranchisee[0].Franchisee];
      this.locationName = this.franchiseeList[0].Franchisee_Name;
      this.franchiseeMobileNo = this.franchiseeList[0].Mobile_No;
    }
    else {
      this.franchiseeList = this.filterFranchisee[0].Franchisee;
      let dt = this.franchiseeList.filter((dt: any) => {
        return dt.Franchisee_Code == data.Franchisee_Code
      }).map((obj: any) => {
        return obj
      })
      this.locationName = dt[0].Franchisee_Name;
      this.franchiseeMobileNo = dt[0].Mobile_No;

    }

    this.selectedpincode = data.Pin_Code;
    this.selectedDevice = data.Franchisee_Code;
    //this.locationName=this.franchiseeList[0].Franchisee_Name;
    if (isPlatformBrowser(this.platformId)) {
      window.sessionStorage.removeItem('uddixadd');
    }
  }

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
          "FirstName": this.admissionForm.get('fname')?.value,
          "HaveSpace": "",
          "LastName": this.admissionForm.get('lname')?.value,
          "Location": this.admissionForm.get('location')?.value,
          "Location_name": this.locationName,
          "Mobile": this.admissionForm.get('mobile')?.value,
          "PinCode": this.admissionForm.get('pinCode')?.value,
          "class": "",
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

  selectState(selectVal: any) {
    let state = selectVal.target.value
    let filterCity = this.stateList.filter((x: any) => {
      return x.State_Name == state
    })
    this.cityList = filterCity[0].City
  }

  selectCity(selectVal: any) {
    let city = selectVal.target.value
    this.filterFranchisee = this.cityList.filter((x: any) => {
      return x.City_Name == city
    })
    if (!Array.isArray(this.filterFranchisee[0].Franchisee)) {
      this.franchiseeList = [this.filterFranchisee[0].Franchisee]
    }
    else {
      this.franchiseeList = this.filterFranchisee[0].Franchisee
    }

  }

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
