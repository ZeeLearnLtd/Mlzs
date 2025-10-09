import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
//import { Collapse } from 'bootstrap';
declare global {
  interface Window {
    bootstrap: any;
  }
}
import { ProjectSeoService } from 'src/app/services/projectseo.service';
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  @ViewChild('navbarCollapse', { static: false }) navbarCollapse!: ElementRef;
  scrollPosition: any
  inputValue: string = '';
  constructor(private _router: Router, private searchService: ProjectSeoService) { }

  gotPage() {
    document.getElementById("trigger-overlay")?.click();
  }
  sendMessage() {
    this.searchService.changeSearchMessage(this.inputValue);
    this._router.navigate(['/search'], { queryParams: { q: this.inputValue } })
    this.inputValue = ''
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
