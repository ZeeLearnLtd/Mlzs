import { Component } from '@angular/core';
declare var $: any;  // Declare jQuery
@Component({
  selector: 'app-our-parents',
  templateUrl: './our-parents.component.html',
  styleUrls: ['./our-parents.component.css']
})
export class OurParentsComponent {


  ngAfterViewInit(): void {
    setTimeout(()=>{
      $('.vertical_carousel').owlCarousel({
        loop:true,
        margin:10,
        items: 1,
        nav:false,
      animateOut: 'slideOutUp',
      animateIn: 'slideInUp'
    })
    },1000)

  }
}
