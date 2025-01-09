import { Component } from '@angular/core';
declare var $: any;  // Declare jQuery
@Component({
  selector: 'app-parents-corner',
  templateUrl: './parents-corner.component.html',
  styleUrls: ['./parents-corner.component.css']
})
export class ParentsCornerComponent {
  ngAfterViewInit(): void {
    setTimeout(()=>{
      var owl = $(".parent_owl");
    owl.owlCarousel({
      items: 4,
      margin: 10,
      loop: true,
      nav: false
    });
    },1000)
  
  }
}
