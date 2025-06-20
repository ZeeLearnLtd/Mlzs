import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ApicallService } from 'src/app/services/apicall.service';
import { ProjectSeoService } from 'src/app/services/projectseo.service';
import { environment } from 'src/environments/environment';
import { NgxSpinnerService } from "ngx-spinner";
import { ToastrService } from 'ngx-toastr';
@Component({
  selector: 'app-start-school',
  templateUrl: './start-school.component.html',
  styleUrls: ['./start-school.component.css']
})
export class StartSchoolComponent {
  projectId = environment.projectid;
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
  constructor(private apiService: ApicallService, private projectService: ProjectSeoService,
    private toastr: ToastrService,
    private fb: FormBuilder,
    private ngxSpinner: NgxSpinnerService,) {
    this.admissionForm = fb.group({
      fname: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      mobile: ['', [Validators.required, Validators.pattern("^((\\+91-?)|0)?[0-9]{10}$")]],
      state: ['', Validators.required],
      city: ['', Validators.required],
      otp: ['', Validators.required],

    })
  }

  ngOnInit(): void {
    this.selectCountry_State_cityList()
  }

  get f() {
    return this.admissionForm.controls;
  }

  selectCountry_State_cityList() {
    this.apiService.getState_countryList().subscribe(
      res => {
        this.stateList = res.root.subroot
        // let filterState = this.countryList.filter((x: any) => {
        //   return x.Country_Name == "India"
        // })
        // this.stateList = filterState[0].State
        console.log('countryList', this.stateList)
      })
    this.getseo();
  }

  getseo() {
    let tbody = {
      slug: 'start-school',
      Projectid: environment.projectid,
    };
    this.apiService.getGetseo(tbody).subscribe((data: any) => {
      this.projectService.sendMessagebread(data.data.breadcrumb);
      this.projectService.sendMessageblog(data?.data?.blog);
      this.projectService.sendMessageseo(data?.data?.testimony);
      this.projectService.sendMessageFaqs(data?.data?.faq);
      this.projectService.setmeta(data?.data);

    });
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
      "smsText": `To validate your interest in the MLZS Franchise, your OTP is ${this.randomOtp}`+`. Think Education. Think Zee Learn.`,
      "sResponse": "",
      "header":"ZLMLZS"
    }
    this.apiService.getOtp(mobNo).subscribe(
      res => {
        this.otpInput = true;
      },
      error => {
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



  selectState(selectVal: any) {
    let state = selectVal.target.value
    let filterCity = this.stateList.filter((x: any) => {
      return x.StateName == state
    })
    this.cityList = filterCity[0].City
    console.log('citylist', this.cityList)
  }

  selectCity(selectVal: any) {
    let city = selectVal.target.value
    let filterFranchisee = this.cityList.filter((x: any) => {
      return x.City_Name == city
    })
    this.franchiseeList = filterFranchisee[0].Franchisee
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
          "utm_medium": "Website",
          "utm_source": "Website",
          "utm_compaign": "Website",
          "utm_term": null,
          "utm_content": null,
          "utm_ad": null,
          "gclid": null,
          "Type": "F",
          "Source": "Website",
          "FirstName": this.admissionForm.get('fname')?.value,
          "Email": this.admissionForm.get('email')?.value,
          "Mobile": this.admissionForm.get('mobile')?.value,
          "State": this.admissionForm.get('state')?.value,
          "City": this.admissionForm.get('city')?.value,
          "LocationId": "",
          "class": "",
          "ProjectId": "3607",
          "Location": "",
          "Location_name": "",
          "Country": "India",
          "Product": "259262000039670041"
        }
        this.apiService.savefranchiseeData(obj).subscribe(
          res => {
            this.toastr.success('Admission submit successfully!');
            this.otp_ValidMsg = false;
            this.otp_inValidMsg = false;
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



}
