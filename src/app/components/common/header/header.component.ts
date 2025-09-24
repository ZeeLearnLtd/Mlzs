import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
//import { Collapse } from 'bootstrap';
declare global {
  interface Window {
    bootstrap: any;
  }
}
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  @ViewChild('navbarCollapse', { static: false }) navbarCollapse!: ElementRef;
  scrollPosition: any
  constructor(private _router: Router) { }

  gotPage() {
    document.getElementById("trigger-overlay")?.click();
  }

  ngOnInit(): void {
    // this.scrollPosition = window.scrollY;
  }
  // toggleMenu() {
  //   const element = this.navbarCollapse.nativeElement;
  //   const bsCollapse = Collapse.getInstance(element) || new Collapse(element, { toggle: false });
  //   bsCollapse.toggle();
  // }
  // closeMenu() {
  //   const element = this.navbarCollapse.nativeElement;
  //   const bsCollapse = Collapse.getInstance(element) || new Collapse(element, { toggle: false });
  //   bsCollapse.hide();
  // }
  toggleMenu() {
    const element = this.navbarCollapse.nativeElement;
    const bsCollapse =
      window.bootstrap.Collapse.getInstance(element) ||
      new window.bootstrap.Collapse(element, { toggle: false });
    bsCollapse.toggle();
  }

  closeMenu() {
    const element = this.navbarCollapse.nativeElement;
    const bsCollapse =
      window.bootstrap.Collapse.getInstance(element) ||
      new window.bootstrap.Collapse(element, { toggle: false });
    bsCollapse.hide();
  }
}
