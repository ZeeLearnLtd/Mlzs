import { AfterViewInit, Component, Inject, OnInit, PLATFORM_ID } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ApicallService } from 'src/app/services/apicall.service';
import { ProjectSeoService } from 'src/app/services/projectseo.service';
import { environment } from 'src/environments/environment';
import { isPlatformBrowser, isPlatformServer } from '@angular/common';
@Component({
  selector: 'app-legancy',
  templateUrl: './legancy.component.html',
  styleUrls: ['./legancy.component.css'],
})
export class LegancyComponent implements OnInit, AfterViewInit {
  // active:boolean=false
  deactive: boolean = false;
  eduction: boolean = false;
  headerTitle = 'Legacy';
  Legacy: boolean = false;
  kidzeeAdvantage: boolean = false;
  year22: boolean = false;
  year21: boolean = false;
  year20: boolean = false;
  year19: boolean = false;
  awards: boolean = false;
  year18: boolean = false;
  year23: boolean = true;
  constructor(
    @Inject(PLATFORM_ID) private platformId: Object,
    private route: ActivatedRoute,
    private projectService: ProjectSeoService,
    private apiService: ApicallService
  ) { }
  ngAfterViewInit(): void {
    setTimeout(() => {
      if (isPlatformServer(this.platformId)) {
        window.scrollTo({
          top: 400,
          left: 0,
          behavior: 'smooth'
        });
      }
    }, 100);
    throw new Error('Method not implemented.');
  }

  ngOnInit() {
    //this.scrollToPosition();
    this.legacyvisible();
    this.getseo();

  }
  getseo() {
    let tbody = {
      slug: 'legacy',
      Projectid: environment.projectid,
    };
    this.apiService.getGetseo(tbody).subscribe((data: any) => {
      this.projectService.sendMessagebread(data.data.breadcrumb);
      this.projectService.sendMessageblog(data.data.blog);
      this.projectService.sendMessageseo(data.data.testimony);
      this.projectService.setmeta(data.data);
    });
  }
  legacyvisible() {
    this.Legacy = true;
    this.kidzeeAdvantage = false;
    this.awards = false;
  }
  advantagevisible() {
    this.Legacy = false;
    this.kidzeeAdvantage = true;
    this.deactive = true;
    this.eduction = false;
    this.awards = false;
  }
  visionvisible() {
    this.eduction = true;
    this.kidzeeAdvantage = false;
    this.deactive = true;
    this.Legacy = false;
    this.awards = false;
  }
  recognivisible() {
    this.eduction = false;
    this.kidzeeAdvantage = false;
    this.deactive = true;
    this.Legacy = false;
    this.awards = true;
  }

  openTab(value: any, title: any) {
    if (value == 1) {
      this.legacyvisible();
      this.headerTitle = title;
    }
    if (value == 2) {
      this.advantagevisible();
      this.headerTitle = title;
    }
    if (value == 3) {
      this.visionvisible();
      this.headerTitle = title;
    }
    if (value == 4) {
      this.recognivisible();
      this.headerTitle = title;
    }
  }

  clickYear(value: any) {
    if (value == 0) {
      ((document.getElementById('year0') as HTMLElement).style.color =
        '#FAC216'),
        ((document.getElementById('year0') as HTMLElement).style.fontSize =
          '20px'),
        ((document.getElementById('year1') as HTMLElement).style.color =
          'rgba(102, 103, 104, 0.50)'),
        ((document.getElementById('year1') as HTMLElement).style.fontSize =
          '20px'),
        ((document.getElementById('year2') as HTMLElement).style.fontSize =
          '18px'),
        ((document.getElementById('year3') as HTMLElement).style.fontSize =
          '18px'),
        ((document.getElementById('year4') as HTMLElement).style.fontSize =
          '18px'),
        ((document.getElementById('year2') as HTMLElement).style.color =
          'rgba(102, 103, 104, 0.50)'),
        ((document.getElementById('year3') as HTMLElement).style.color =
          'rgba(102, 103, 104, 0.50)'),
        ((document.getElementById('year4') as HTMLElement).style.color =
          'rgba(102, 103, 104, 0.50)');
      this.year23 = true;
      this.year22 = false;
      this.year21 = false;
      this.year20 = false;
      this.year19 = false;
      this.year18 = false;
    }
    if (value == 1) {
      ((document.getElementById('year0') as HTMLElement).style.color =
        'rgba(102, 103, 104, 0.50)'),
        ((document.getElementById('year0') as HTMLElement).style.fontSize =
          '20px'),
        ((document.getElementById('year1') as HTMLElement).style.color =
          '#FAC216'),
        ((document.getElementById('year1') as HTMLElement).style.fontSize =
          '20px'),
        ((document.getElementById('year2') as HTMLElement).style.fontSize =
          '18px'),
        ((document.getElementById('year3') as HTMLElement).style.fontSize =
          '18px'),
        ((document.getElementById('year4') as HTMLElement).style.fontSize =
          '18px'),
        ((document.getElementById('year2') as HTMLElement).style.color =
          'rgba(102, 103, 104, 0.50)'),
        ((document.getElementById('year3') as HTMLElement).style.color =
          'rgba(102, 103, 104, 0.50)'),
        ((document.getElementById('year4') as HTMLElement).style.color =
          'rgba(102, 103, 104, 0.50)');
      this.year23 = false;
      this.year22 = true;
      this.year21 = false;
      this.year20 = false;
      this.year19 = false;
      this.year18 = false;

    }
    if (value == 2) {
      ((document.getElementById('year1') as HTMLElement).style.color =
        'rgba(102, 103, 104, 0.50)'),
        ((document.getElementById('year2') as HTMLElement).style.color =
          '#FAC216'),
        ((document.getElementById('year2') as HTMLElement).style.fontSize =
          '20px'),
        ((document.getElementById('year1') as HTMLElement).style.fontSize =
          '18px'),
        ((document.getElementById('year3') as HTMLElement).style.fontSize =
          '18px'),
        ((document.getElementById('year4') as HTMLElement).style.fontSize =
          '18px'),
        ((document.getElementById('year3') as HTMLElement).style.color =
          'rgba(102, 103, 104, 0.50)'),
        ((document.getElementById('year0') as HTMLElement).style.fontSize =
          '18px'),
        ((document.getElementById('year0') as HTMLElement).style.color =
          'rgba(102, 103, 104, 0.50)'),
        ((document.getElementById('year4') as HTMLElement).style.color =
          'rgba(102, 103, 104, 0.50)');
      this.year23 = true;
      this.year22 = false;
      this.year21 = false;
      this.year20 = false;
      this.year19 = false;
      this.year18 = false;
    }
    if (value == 3) {
      ((document.getElementById('year0') as HTMLElement).style.fontSize =
        '18px'),
        ((document.getElementById('year0') as HTMLElement).style.color =
          'rgba(102, 103, 104, 0.50)'),
        ((document.getElementById('year1') as HTMLElement).style.color =
          'rgba(102, 103, 104, 0.50)'),
        ((document.getElementById('year2') as HTMLElement).style.color =
          'rgba(102, 103, 104, 0.50)'),
        ((document.getElementById('year3') as HTMLElement).style.color =
          '#FAC216'),
        ((document.getElementById('year3') as HTMLElement).style.fontSize =
          '20px'),
        ((document.getElementById('year2') as HTMLElement).style.fontSize =
          '18px'),
        ((document.getElementById('year1') as HTMLElement).style.fontSize =
          '18px'),
        ((document.getElementById('year4') as HTMLElement).style.fontSize =
          '18px'),
        ((document.getElementById('year4') as HTMLElement).style.color =
          'rgba(102, 103, 104, 0.50)');
      this.year23 = false;
      this.year22 = false;
      this.year21 = false;
      this.year20 = true;
      this.year19 = false;
      this.year18 = false;
    }
    if (value == 4) {
      ((document.getElementById('year0') as HTMLElement).style.fontSize =
        '18px'),
        ((document.getElementById('year0') as HTMLElement).style.color =
          'rgba(102, 103, 104, 0.50)'),
        ((document.getElementById('year1') as HTMLElement).style.color =
          'rgba(102, 103, 104, 0.50)'),
        ((document.getElementById('year2') as HTMLElement).style.color =
          'rgba(102, 103, 104, 0.50)'),
        ((document.getElementById('year3') as HTMLElement).style.color =
          'rgba(102, 103, 104, 0.50)'),
        ((document.getElementById('year4') as HTMLElement).style.color =
          '#FAC216'),
        ((document.getElementById('year4') as HTMLElement).style.fontSize =
          '20px'),
        ((document.getElementById('year5') as HTMLElement).style.color =
          'rgba(102, 103, 104, 0.50)'),
        ((document.getElementById('year5') as HTMLElement).style.fontSize =
          '20px'),
        ((document.getElementById('year2') as HTMLElement).style.fontSize =
          '18px'),
        ((document.getElementById('year3') as HTMLElement).style.fontSize =
          '18px'),
        ((document.getElementById('year1') as HTMLElement).style.fontSize =
          '18px');
      this.year23 = false;
      this.year22 = false;
      this.year21 = false;
      this.year20 = false;
      this.year19 = true;
      this.year18 = false;
    }
    if (value == 5) {
      ((document.getElementById('year0') as HTMLElement).style.fontSize =
        '18px'),
        ((document.getElementById('year0') as HTMLElement).style.color =
          'rgba(102, 103, 104, 0.50)'),
        ((document.getElementById('year1') as HTMLElement).style.color =
          'rgba(102, 103, 104, 0.50)'),
        ((document.getElementById('year2') as HTMLElement).style.color =
          'rgba(102, 103, 104, 0.50)'),
        ((document.getElementById('year3') as HTMLElement).style.color =
          'rgba(102, 103, 104, 0.50)'),
        ((document.getElementById('year4') as HTMLElement).style.color =
          'rgba(102, 103, 104, 0.50)'),
        ((document.getElementById('year5') as HTMLElement).style.color =
          '#FAC216'),
        ((document.getElementById('year4') as HTMLElement).style.fontSize =
          '20px'),
        ((document.getElementById('year5') as HTMLElement).style.fontSize =
          '20px'),
        ((document.getElementById('year2') as HTMLElement).style.fontSize =
          '18px'),
        ((document.getElementById('year3') as HTMLElement).style.fontSize =
          '18px'),
        ((document.getElementById('year1') as HTMLElement).style.fontSize =
          '18px');
      this.year23 = false;
      this.year22 = false;
      this.year21 = false;
      this.year20 = false;
      this.year19 = false;
      this.year18 = true;
    }
  }


  scrollToPosition() {
    if (isPlatformServer(this.platformId)) {
      window.scrollTo({
        top: 500,  // Scroll to the top of the page
        left: 0, // Horizontal scroll (set to 0 for no horizontal scroll)
        behavior: 'smooth'  // Smooth scrolling effect
      });
    }
  }
}
