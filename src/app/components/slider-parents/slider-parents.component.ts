import { Component, NgZone, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { Observable, Subscription, filter, of, switchMap, tap } from 'rxjs';
import { ProjectSeoService } from 'src/app/services/projectseo.service';

@Component({
  selector: 'app-slider-parents',
  templateUrl: './slider-parents.component.html',
  styleUrls: ['./slider-parents.component.css']
})
export class SliderParentsComponent implements OnInit{
  subscriptionnav!: Subscription;
  testimonydata: any;
  sanitizedResourceUrls: any;
   profile_title: any;
   currentSlideIndex: number = 0;
  subProfileInfo: any;
  currentIndex: number = 0;
  dataList: any;
constructor( private projectService: ProjectSeoService,
  private sanitizer: DomSanitizer,
  private zone: NgZone
){
}
  ngOnInit(): void {
    this.subscriptionnav = this.projectService
    .onseoMessage()
    .subscribe({
      next:async(data)=>{
       this.dataList = data.text;   
          
       this.testimonialData();
      }
      // console.log('call2')
      // if (message) {
      //   this.testimonydata = message.text;
      //   console.log('slider',this.testimonydata)
      // }
    });
  }


  testimonialData(){
    this.testimonydata =  this.dataList
     this.profile_title = this.testimonydata[0].Title
    this.subProfileInfo = this.testimonydata[0].Short
  }
  
  loadSlideData() {
    const slide = this.testimonydata[this.currentSlideIndex];
    }

  goToNextSlide() {
    console.log('next',this.currentSlideIndex)
    console.log('list',this.testimonydata)
    
    if (this.currentSlideIndex < this.testimonydata.length - 1) {
      this.currentSlideIndex++;
   
   this.testimonydata.forEach((element:any) => {
    let getIndexNo = this.testimonydata.indexOf(element);
    
    if(getIndexNo == this.currentSlideIndex){
     this.profile_title = element.Title
    this.subProfileInfo = element.Short
    }
   });
    } else {
      this.currentSlideIndex = 0;
      }
    this.loadSlideData();
  }

  goToPrevSlide() {
    console.log('cl prev')
    console.log(this.currentSlideIndex < this.testimonydata.length + 1)
    if (this.currentSlideIndex < this.testimonydata.length + 1) {

      this.currentSlideIndex--;
   this.testimonydata.forEach((element:any) => {
    let getIndexNo = this.testimonydata.indexOf(element);
    console.log('Prev',Math.abs(this.currentSlideIndex),getIndexNo)
    if(Math.abs(this.currentSlideIndex) == getIndexNo){
      this.profile_title = element.Title
       this.subProfileInfo = element.Short
       console.log(this.profile_title);
   }
   });
    } else {
      this.currentSlideIndex = 0;
    }
    this.loadSlideData();
  }


  nextImage(): void {
    this.currentIndex = (this.currentIndex + 1) % this.testimonydata.length;
  }

  // Function to move to the previous image
  prevImage(): void {
    this.currentIndex = (this.currentIndex - 1 + this.testimonydata.length) % this.testimonydata.length;
  }

}


 // console.log('data',this.testimonydata);
        // this.testimonydata = this.testimonydata.map((slide:any) => {
        //   slide.files = slide.files.map((file:any) => {
        //     file.url = this.sanitizer.bypassSecurityTrustUrl(file.url) as string;
        //     return file;
        //   });
        //   return slide;
        // });