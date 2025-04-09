import { Component } from '@angular/core';
declare var $: any;  // Declare jQuery
@Component({
  selector: 'app-child-development',
  templateUrl: './child-development.component.html',
  styleUrls: ['./child-development.component.css']
})
export class ChildDevelopmentComponent {
  ngAfterViewInit(): void {
    setTimeout(() => {
      var owl = $(".parent_owl");
      owl.owlCarousel({
        items: 3,
        margin: 25,
        loop: true,
        nav: false,
        center: true,
        responsive: {
          0: {
            items: 1, // On mobile (0px and up), show 1 item
          },
          600: {
            items: 2, // On tablets (600px and up), show 2 items
          },
          1000: {
            items: 3, // On larger screens (1000px and up), show 3 items
          },
        }
      });

      var owl = $(".parent_owl");
      owl.owlCarousel({
        items: 3,
        margin: 25,
        loop: true,
        nav: false,
        center: true,
        responsive: {
          0: {
            items: 1, // On mobile (0px and up), show 1 item
          },
          600: {
            items: 2, // On tablets (600px and up), show 2 items
          },
          1000: {
            items: 3, // On larger screens (1000px and up), show 3 items
          },
        }
      });
    }, 1000)

  }
}
