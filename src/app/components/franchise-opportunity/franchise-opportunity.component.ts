import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CommonService } from '../service/common.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ProjectSeoService } from 'src/app/services/projectseo.service';
import { environment } from 'src/environments/environment';
import { ApicallService } from 'src/app/services/apicall.service';
import { NgxSpinnerService } from "ngx-spinner";

@Component({
  selector: 'app-franchise-opportunity',
  templateUrl: './franchise-opportunity.component.html',
  styleUrls: ['./franchise-opportunity.component.css']
})
export class FranchiseOpportunityComponent implements OnInit {
  year22: boolean = false
  year21: boolean = false
  year20: boolean = false
  year19: boolean = false
  awards: boolean = false
  year18: boolean = false
  year23: boolean = true
  otp_ValidMsg: boolean = false
  otp_inValidMsg: boolean = false
  submitted: boolean = false
  admissionForm: FormGroup;
  otpInput: boolean = false
  randomOtp: any;
  countryList: any;
  stateList: any;
  cityList: any;
  franchiseeList: any;

  constructor(private fb: FormBuilder, private ngxSpinner: NgxSpinnerService, private _servie: CommonService, private _activeRoute: ActivatedRoute, private router: Router,
    private projectService: ProjectSeoService,
    private apiService: ApicallService) {
    this.admissionForm = fb.group({
      fname: ['', Validators.required],
      lname: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      mobile: ['', [Validators.required, Validators.pattern("^((\\+91-?)|0)?[0-9]{10}$")]],
      pinCode: ['', [Validators.required, Validators.pattern("^((\\+91-?)|0)?[0-9]{6}$")]],
      state: ['', Validators.required],
      city: ['', Validators.required],
      otp: ['', Validators.required],

    })
  }
  ngOnInit(): void {
    this.selectCountry_State_cityList();

  }


  getseo() {
    let tbody = {
      slug: 'partner-with-kidzee',
      Projectid: environment.projectid,
    };
    this.apiService.getGetseo(tbody).subscribe((data: any) => {
      this.projectService.sendMessagebread(data.data.breadcrumb);
      this.projectService.sendMessageblog(data.data.blog);
      this.projectService.sendMessageseo(data.data.testimony);
      this.projectService.setmeta(data.data);
      this.projectService.sendMessageFaqs(data.data.faq);
    });
  }

  get f() {
    return this.admissionForm.controls;
  }



  clickYear(value: any) {
    if (value == 0) {
      (document.getElementById('year1') as HTMLElement).style.color = "rgba(102, 103, 104, 0.50)",
        (document.getElementById('year1') as HTMLElement).style.fontSize = "18px",
        (document.getElementById('year2') as HTMLElement).style.fontSize = "18px",
        (document.getElementById('year3') as HTMLElement).style.fontSize = "18px",
        (document.getElementById('year4') as HTMLElement).style.fontSize = "18px",
        (document.getElementById('year2') as HTMLElement).style.color = "rgba(102, 103, 104, 0.50)",
        (document.getElementById('year3') as HTMLElement).style.color = "rgba(102, 103, 104, 0.50)",
        (document.getElementById('year4') as HTMLElement).style.color = "rgba(102, 103, 104, 0.50)",
        (document.getElementById('year5') as HTMLElement).style.color = "rgba(102, 103, 104, 0.50)",
        (document.getElementById('year5') as HTMLElement).style.fontSize = "18px",
        (document.getElementById('year0') as HTMLElement).style.color = "#FAC216",
        (document.getElementById('year0') as HTMLElement).style.fontSize = "20px",
        this.year22 = false
      this.year21 = false
      this.year20 = false
      this.year19 = false
      this.year18 = false
      this.year23 = true
    }
    if (value == 1) {
      (document.getElementById('year1') as HTMLElement).style.color = "#FAC216",
        (document.getElementById('year1') as HTMLElement).style.fontSize = "20px",
        (document.getElementById('year2') as HTMLElement).style.fontSize = "18px",
        (document.getElementById('year3') as HTMLElement).style.fontSize = "18px",
        (document.getElementById('year4') as HTMLElement).style.fontSize = "18px",
        (document.getElementById('year2') as HTMLElement).style.color = "rgba(102, 103, 104, 0.50)",
        (document.getElementById('year3') as HTMLElement).style.color = "rgba(102, 103, 104, 0.50)",
        (document.getElementById('year4') as HTMLElement).style.color = "rgba(102, 103, 104, 0.50)",
        (document.getElementById('year5') as HTMLElement).style.color = "rgba(102, 103, 104, 0.50)",
        (document.getElementById('year5') as HTMLElement).style.fontSize = "18px",
        (document.getElementById('year0') as HTMLElement).style.color = "rgba(102, 103, 104, 0.50)",
        (document.getElementById('year0') as HTMLElement).style.fontSize = "18px",
        this.year22 = true
      this.year21 = false
      this.year20 = false
      this.year19 = false
      this.year18 = false
      this.year23 = false
    }
    if (value == 2) {
      (document.getElementById('year1') as HTMLElement).style.color = "rgba(102, 103, 104, 0.50)",
        (document.getElementById('year2') as HTMLElement).style.color = "#FAC216",
        (document.getElementById('year2') as HTMLElement).style.fontSize = "20px",
        (document.getElementById('year1') as HTMLElement).style.fontSize = "18px",
        (document.getElementById('year3') as HTMLElement).style.fontSize = "18px",
        (document.getElementById('year4') as HTMLElement).style.fontSize = "18px",
        (document.getElementById('year3') as HTMLElement).style.color = "rgba(102, 103, 104, 0.50)",
        (document.getElementById('year4') as HTMLElement).style.color = "rgba(102, 103, 104, 0.50)",
        (document.getElementById('year5') as HTMLElement).style.color = "rgba(102, 103, 104, 0.50)",
        (document.getElementById('year5') as HTMLElement).style.fontSize = "18px",
        (document.getElementById('year0') as HTMLElement).style.color = "rgba(102, 103, 104, 0.50)",
        (document.getElementById('year0') as HTMLElement).style.fontSize = "18px",
        this.year22 = false
      this.year21 = true
      this.year20 = false
      this.year19 = false
      this.year18 = false
      this.year23 = false
    }
    if (value == 3) {
      (document.getElementById('year1') as HTMLElement).style.color = "rgba(102, 103, 104, 0.50)",
        (document.getElementById('year2') as HTMLElement).style.color = "rgba(102, 103, 104, 0.50)",
        (document.getElementById('year3') as HTMLElement).style.color = "#FAC216",
        (document.getElementById('year3') as HTMLElement).style.fontSize = "20px",
        (document.getElementById('year2') as HTMLElement).style.fontSize = "18px",
        (document.getElementById('year1') as HTMLElement).style.fontSize = "18px",
        (document.getElementById('year4') as HTMLElement).style.fontSize = "18px",
        (document.getElementById('year4') as HTMLElement).style.color = "rgba(102, 103, 104, 0.50)",
        (document.getElementById('year5') as HTMLElement).style.color = "rgba(102, 103, 104, 0.50)",
        (document.getElementById('year5') as HTMLElement).style.fontSize = "18px",
        (document.getElementById('year0') as HTMLElement).style.color = "rgba(102, 103, 104, 0.50)",
        (document.getElementById('year0') as HTMLElement).style.fontSize = "18px",
        this.year22 = false
      this.year21 = false
      this.year20 = true
      this.year19 = false
      this.year18 = false
      this.year23 = false
    }
    if (value == 4) {
      (document.getElementById('year1') as HTMLElement).style.color = "rgba(102, 103, 104, 0.50)",
        (document.getElementById('year2') as HTMLElement).style.color = "rgba(102, 103, 104, 0.50)",
        (document.getElementById('year3') as HTMLElement).style.color = "rgba(102, 103, 104, 0.50)",
        (document.getElementById('year5') as HTMLElement).style.color = "rgba(102, 103, 104, 0.50)",
        (document.getElementById('year5') as HTMLElement).style.fontSize = "18px",
        (document.getElementById('year4') as HTMLElement).style.color = "#FAC216",
        (document.getElementById('year4') as HTMLElement).style.fontSize = "20px",
        (document.getElementById('year2') as HTMLElement).style.fontSize = "18px",
        (document.getElementById('year3') as HTMLElement).style.fontSize = "18px",
        (document.getElementById('year1') as HTMLElement).style.fontSize = "18px",
        (document.getElementById('year0') as HTMLElement).style.color = "rgba(102, 103, 104, 0.50)",
        (document.getElementById('year0') as HTMLElement).style.fontSize = "18px",
        this.year22 = false
      this.year21 = false
      this.year20 = false
      this.year19 = true
      this.year18 = false
      this.year23 = false
    }

    if (value == 5) {
      (document.getElementById('year1') as HTMLElement).style.color = "rgba(102, 103, 104, 0.50)",
        (document.getElementById('year2') as HTMLElement).style.color = "rgba(102, 103, 104, 0.50)",
        (document.getElementById('year3') as HTMLElement).style.color = "rgba(102, 103, 104, 0.50)",
        (document.getElementById('year4') as HTMLElement).style.color = "rgba(102, 103, 104, 0.50)",
        (document.getElementById('year4') as HTMLElement).style.fontSize = "18px",
        (document.getElementById('year5') as HTMLElement).style.color = "#FAC216",
        (document.getElementById('year5') as HTMLElement).style.fontSize = "20px",
        (document.getElementById('year2') as HTMLElement).style.fontSize = "18px",
        (document.getElementById('year3') as HTMLElement).style.fontSize = "18px",
        (document.getElementById('year1') as HTMLElement).style.fontSize = "18px",
        (document.getElementById('year0') as HTMLElement).style.color = "rgba(102, 103, 104, 0.50)",
        (document.getElementById('year0') as HTMLElement).style.fontSize = "18px",
        this.year22 = false
      this.year21 = false
      this.year20 = false
      this.year18 = true
      this.year23 = false
      this.year19 = false
    }

  }


  validationForm() {
    this.submitted = true;
    if (this.admissionForm.invalid) {
      return;
    } else {
      this.submitForm()
    }

  }

  submitForm() {

    if ((this.admissionForm.get('otp')?.value).length == 4) {
      if (this.randomOtp == this.admissionForm.get('otp')?.value) {
        this.ngxSpinner.show();
        let obj = {
          "City": this.admissionForm.get('city')?.value,
          "Country": "India",
          "Email": this.admissionForm.get('email')?.value,
          "FirstName": this.admissionForm.get('fname')?.value,
          "HaveSpace": "",
          "LastName": this.admissionForm.get('lname')?.value,
          "Location": "",
          "Mobile": this.admissionForm.get('mobile')?.value,
          "PinCode": this.admissionForm.get('pinCode')?.value,
          "Product": "259262000001186013",
          "ProjectId": "1",
          "SoonStartsIn": "",
          "Source": "gclid",
          "gclid": "gclid",
          "State": this.admissionForm.get('state')?.value,
          "Type": "F",
          "WillingToInvest": "",
          "utm_compaign": "Website",
          "utm_medium": "Website",
          "utm_source": "Website",
          "utm_ad": "Website",
          "utm_Content": "Website",
          "utm_Term": "Website",
        }
        this._servie.savefranchiseeData(obj).subscribe(
          res => {
            this.ngxSpinner.hide();
            this.otp_ValidMsg = false;
            this.otp_inValidMsg = false;
            this.router.navigate(['franchise/thankyou'])
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
    this._servie.getState_countryList().subscribe(
      res => {
        this.countryList = res.root.subroot

        let filterState = this.countryList.filter((x: any) => {
          return x.Country_Name == "India"
        })
        this.stateList = filterState[0].State
      })
    this.getseo();
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
    let filterFranchisee = this.cityList.filter((x: any) => {
      return x.City_Name == city
    })
    this.franchiseeList = filterFranchisee[0].Franchisee
  }

}
