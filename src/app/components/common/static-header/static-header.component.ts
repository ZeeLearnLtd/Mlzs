import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { Collapse } from 'bootstrap';

@Component({
  selector: 'app-static-header',
  templateUrl: './static-header.component.html',
  styleUrls: ['./static-header.component.css']
})
export class StaticHeaderComponent {
  @ViewChild('navbarCollapse', { static: false }) navbarCollapse!: ElementRef;
  scrollPosition: any
  constructor(private _router: Router) { }

  gotPage() {
    document.getElementById("trigger-overlay")?.click();
  }

  ngOnInit(): void {
    // this.scrollPosition = window.scrollY;
  }

  // scroll_hide(){
  //   console.log('scroll')
  //   if (this.scrollPosition > 100) {
  //     document.getElementById('ab_id')?.remove();
  //      }
  // }

  closeMenu() {
    // document.getElementById("dropdown_menu")?.click();
    const element = this.navbarCollapse.nativeElement;
    const bsCollapse = Collapse.getInstance(element) || new Collapse(element);
    bsCollapse.hide(); // Close the menu
  }
}
