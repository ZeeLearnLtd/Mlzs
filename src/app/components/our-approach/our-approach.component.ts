import { AfterViewInit, Component, OnInit } from '@angular/core';
import { ProjectSeoService } from 'src/app/services/projectseo.service';
import { environment } from 'src/environments/environment';
import { ApicallService } from 'src/app/services/apicall.service';
@Component({
  selector: 'app-our-approach',
  templateUrl: './our-approach.component.html',
  styleUrls: ['./our-approach.component.css']
})
export class OurApproachComponent implements OnInit {
  active: boolean = false
  deactive: boolean = false
  eduction: boolean = false
  headerTitle = "Kidzee Advantage"
  Legacy: boolean = false
  kidzeeAdvantage: boolean = false
  year22: boolean = true
  year21: boolean = false
  year20: boolean = false
  year19: boolean = false
  awards: boolean = false
  constructor(
    private projectService: ProjectSeoService,
    private apiService: ApicallService
  ) {

  }
  ngAfterViewInit(): void {
    setTimeout(() => {
      this.scrollToPosition();
    }, 100);
    throw new Error('Method not implemented.');
 }
  ngOnInit() {
    
    this.advantagevisible();
    this.getseo();
    
  }
  scrollToPosition() {
    window.scrollTo({
      top: 400,  // Scroll to the top of the page
      left: 0, // Horizontal scroll (set to 0 for no horizontal scroll)
      behavior: 'smooth'  // Smooth scrolling effect
    });
  }

  getseo() {
    let tbody = {
      slug: 'our-approach',
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
    this.Legacy = true
    this.kidzeeAdvantage = false
    this.awards = false
  }
  advantagevisible() {
    this.Legacy = false
    this.kidzeeAdvantage = true;
    this.deactive = true
    this.active = false
    this.eduction = false;
    this.awards = false
  }
  visionvisible() {
    this.eduction = true
    this.kidzeeAdvantage = false;
    this.deactive = true
    this.active = false
    this.Legacy = false
    this.awards = false

  }
  recognivisible() {
    this.eduction = false
    this.kidzeeAdvantage = false;
    this.deactive = true
    this.active = false
    this.Legacy = false
    this.awards = true

  }

  openTab(value: any, title: any) {
    if (value == 1) {
      this.legacyvisible();
      this.headerTitle = title
    }
    if (value == 2) {
      this.advantagevisible();
      this.headerTitle = title
    }
    if (value == 3) {
      this.visionvisible();
      this.headerTitle = title
    }
    if (value == 4) {
      this.recognivisible();
      this.headerTitle = title
    }
  }

  clickYear(value: any) {
    if (value == 1) {
      (document.getElementById('year1') as HTMLElement).style.color = "#FAC216",
        (document.getElementById('year1') as HTMLElement).style.fontSize = "20px",
        (document.getElementById('year2') as HTMLElement).style.fontSize = "18px",
        (document.getElementById('year3') as HTMLElement).style.fontSize = "18px",
        (document.getElementById('year4') as HTMLElement).style.fontSize = "18px",
        (document.getElementById('year2') as HTMLElement).style.color = "rgba(102, 103, 104, 0.50)",
        (document.getElementById('year3') as HTMLElement).style.color = "rgba(102, 103, 104, 0.50)",
        (document.getElementById('year4') as HTMLElement).style.color = "rgba(102, 103, 104, 0.50)"
      this.year22 = true
      this.year21 = false
      this.year20 = false
      this.year19 = false
    }
    if (value == 2) {
      (document.getElementById('year1') as HTMLElement).style.color = "rgba(102, 103, 104, 0.50)",
        (document.getElementById('year2') as HTMLElement).style.color = "#FAC216",
        (document.getElementById('year2') as HTMLElement).style.fontSize = "20px",
        (document.getElementById('year1') as HTMLElement).style.fontSize = "18px",
        (document.getElementById('year3') as HTMLElement).style.fontSize = "18px",
        (document.getElementById('year4') as HTMLElement).style.fontSize = "18px",
        (document.getElementById('year3') as HTMLElement).style.color = "rgba(102, 103, 104, 0.50)",
        (document.getElementById('year4') as HTMLElement).style.color = "rgba(102, 103, 104, 0.50)"
      this.year22 = false
      this.year21 = true
      this.year20 = false
      this.year19 = false
    }
    if (value == 3) {
      (document.getElementById('year1') as HTMLElement).style.color = "rgba(102, 103, 104, 0.50)",
        (document.getElementById('year2') as HTMLElement).style.color = "rgba(102, 103, 104, 0.50)",
        (document.getElementById('year3') as HTMLElement).style.color = "#FAC216",
        (document.getElementById('year3') as HTMLElement).style.fontSize = "20px",
        (document.getElementById('year2') as HTMLElement).style.fontSize = "18px",
        (document.getElementById('year1') as HTMLElement).style.fontSize = "18px",
        (document.getElementById('year4') as HTMLElement).style.fontSize = "18px",
        (document.getElementById('year4') as HTMLElement).style.color = "rgba(102, 103, 104, 0.50)"
      this.year22 = false
      this.year21 = false
      this.year20 = true
      this.year19 = false
    }
    if (value == 4) {
      (document.getElementById('year1') as HTMLElement).style.color = "rgba(102, 103, 104, 0.50)",
        (document.getElementById('year2') as HTMLElement).style.color = "rgba(102, 103, 104, 0.50)",
        (document.getElementById('year3') as HTMLElement).style.color = "rgba(102, 103, 104, 0.50)",
        (document.getElementById('year4') as HTMLElement).style.color = "#FAC216",
        (document.getElementById('year4') as HTMLElement).style.fontSize = "20px",
        (document.getElementById('year2') as HTMLElement).style.fontSize = "18px",
        (document.getElementById('year3') as HTMLElement).style.fontSize = "18px",
        (document.getElementById('year1') as HTMLElement).style.fontSize = "18px"
      this.year22 = false
      this.year21 = false
      this.year20 = false
      this.year19 = true
    }

  }
}
