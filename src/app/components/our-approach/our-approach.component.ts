import { AfterViewInit, Component, Inject, OnInit, PLATFORM_ID } from '@angular/core';
import { ProjectSeoService } from 'src/app/services/projectseo.service';
import { environment } from 'src/environments/environment';
import { ApicallService } from 'src/app/services/apicall.service';
import { isPlatformBrowser } from '@angular/common';
@Component({
  selector: 'app-our-approach',
  templateUrl: './our-approach.component.html',
  styleUrls: ['./our-approach.component.css']
})
export class OurApproachComponent implements OnInit {
  projectId = environment.projectid
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
  eventsDetailsData: any;
  eventsData: any;
  constructor(
    @Inject(PLATFORM_ID) private platformId: Object,
    private projectService: ProjectSeoService,
    private apiService: ApicallService
  ) {

  }
  ngOnInit(): void {
    this.getEvents_data()
  }

  getEvents_data() {
    let tbody = {
      Type: "events",
      pageurl: '',
      Project_Id: this.projectId
    };
    this.apiService.getContentDataList(tbody).subscribe((data: any) => {
      if (data?.data[0]?.contentData) {
        let res = data.data[0].contentData
        this.eventsData = JSON.parse(res);
      }
    });

  }
}
