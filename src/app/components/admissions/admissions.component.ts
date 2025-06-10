import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProjectSeoService } from 'src/app/services/projectseo.service';
import { environment } from 'src/environments/environment';
import { ApicallService } from 'src/app/services/apicall.service';

@Component({
  selector: 'app-admissions',
  templateUrl: './admissions.component.html',
  styleUrls: ['./admissions.component.css']
})
export class AdmissionsComponent implements OnInit {
  headerTitle = "Admissions";
  segment: any
  constructor(private _activeRoute: ActivatedRoute,
    private projectService: ProjectSeoService,
    private apiService: ApicallService,
    private activatedRoute: ActivatedRoute) { }
  ngOnInit(): void {
    this.getAdmissionFormData();
    // const urlSegments = this.activatedRoute.snapshot.url;
    // this.segment = urlSegments[0]?.path;
    this._activeRoute.queryParams.subscribe(
      res => {
      }
    )
    this.getseo();
  }


  getseo() {
    let tbody = {
      slug: 'admissions',
      Projectid: environment.projectid,
    };
    this.apiService.getGetseo(tbody).subscribe((data: any) => {
      this.projectService.sendMessagebread(data?.data?.breadcrumb);
      this.projectService.sendMessageblog(data?.data?.blog);
      this.projectService.sendMessageseo(data?.data?.testimony);
      this.projectService.sendMessageFaqs(data?.data?.faq);
      this.projectService.setmeta(data.data);
    });
  }

  getAdmissionFormData() {
    this.apiService.getAllAdmissionData().subscribe((
      res => {
      }
    ))
  }
}
