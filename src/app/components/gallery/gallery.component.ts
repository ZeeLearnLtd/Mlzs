import { Component, Input } from '@angular/core';
import { ApicallService } from 'src/app/services/apicall.service';
import { ProjectSeoService } from 'src/app/services/projectseo.service';
import { environment } from 'src/environments/environment';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';

@Component({
  selector: 'app-gallery',
  templateUrl: './gallery.component.html',
  styleUrls: ['./gallery.component.css']
})
export class GalleryComponent {

  projectId = environment.projectid
  public isCollapsed: boolean[] = [];
  img_content: any;
  contentData: any;
  photoGalleryData: any;
  getFirstData: any;
  allGalleryData: any;

  constructor(private projectService: ProjectSeoService, private sanitizer: DomSanitizer, private _service: ApicallService) { }

  ngOnInit(): void {
    this.getPhoto_data();
    // this.getseo();
  }


  // getseo() {
  //   let tbody = {
  //     slug: 'gallery',
  //     Projectid: environment.projectid,
  //   };
  //   this._service.getGetseo(tbody).subscribe((data: any) => {
  //     this.projectService.sendMessagebread(data.data.breadcrumb);
  //     this.projectService.sendMessageblog(data?.data?.blog);
  //     this.projectService.sendMessageseo(data?.data?.testimony);
  //     this.projectService.sendMessageFaqs(data?.data?.faq);
  //     this.projectService.setmeta(data?.data);

  //   });
  // }

  getPhoto_data() {
    let tbody = {
      Type: "PhotoGallery",
      pageurl: '',
      Project_Id: this.projectId
    };
    this._service.getContentDataList(tbody).subscribe((data: any) => {
      let res = data.data[0].contentData
      this.photoGalleryData = JSON.parse(res);
      this.allGalleryData = this.photoGalleryData;
      this.photoGalleryData = this.allGalleryData.filter((x: any) => {
        if (x.logofiles) {
          return x;
        }
      });
      //console.log('GALLERY', this.photoGalleryData);
    });
  }

  getsanitizeurl(url: string): SafeResourceUrl {
    let videoId = '';
    if (url == undefined) {
      return ''
    }
    if (url.includes('youtu.be/')) {
      videoId = url.split('youtu.be/')[1];
    } else if (url.includes('watch?v=')) {
      videoId = new URL(url).searchParams.get('v') || '';
    } else if (url.includes('embed/')) {
      videoId = url.split('embed/')[1];
    }

    const embedUrl = `https://www.youtube.com/embed/${videoId}`;
    return this.sanitizer.bypassSecurityTrustResourceUrl(embedUrl);
  }
}
