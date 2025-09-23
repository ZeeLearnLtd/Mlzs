import { Component, OnInit, AfterViewInit, PLATFORM_ID, Inject } from '@angular/core';
import { ApicallService } from 'src/app/services/apicall.service';
import { ProjectSeoService } from 'src/app/services/projectseo.service';
import { environment } from 'src/environments/environment';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { NgxSpinnerService } from "ngx-spinner";
import { isPlatformBrowser } from '@angular/common';
declare var $: any;
@Component({
  selector: 'app-discover-gallery',
  templateUrl: './discover-gallery.component.html',
  styleUrls: ['./discover-gallery.component.css']
})
export class DiscoverGalleryComponent {
  slides: any[] = [];
  interval: any;
  projectId = environment.projectid
  public isCollapsed: boolean[] = [];
  img_content: any;
  contentData: any;
  photoGalleryData: any;
  getFirstData: any;
  alldata: any = [];
  Selectedcategory: string = "";
  Assinedcategory: any = [];

  currentIndex: number = 0; // starting page index
  itemsPerPage: number = 3;
  videoGalleryList: any;
  videoList: any;

  constructor(private projectService: ProjectSeoService, private sanitizer: DomSanitizer,
    private _service: ApicallService,
    private spinner: NgxSpinnerService,
    @Inject(PLATFORM_ID) private platformId: Object,
  ) { }

  ngOnInit(): void {
    this.getseo();
  }
  ngAfterViewInit(): void {
    if (isPlatformBrowser(this.platformId)) {
      setTimeout(() => {
        var owl = $(".news_owl");
        owl.owlCarousel({
          items: 1,
          margin: 25,
          loop: true,
          nav: false,
          dots: true,
          center: true,
          touchDrag: true,
          mouseDrag: true,
          responsive: {
            0: {
              items: 1,
            },
            600: {
              items: 1,
            },
            1000: {
              items: 1,
            },
          }
        });
      }, 1000)
    }
  }
  ngOnDestroy(): void {
    clearInterval(this.interval);
  }
  getseo() {
    let tbody = {
      slug: 'gallery',
      Projectid: environment.projectid,
    };
    this._service.getGetseo(tbody).subscribe((data: any) => {
      this.getPhoto_data();
      this.getVideo_data();
      this.projectService.sendMessagebread(data.data.breadcrumb);
      this.projectService.sendMessageblog(data?.data?.blog);
      this.projectService.sendMessageseo(data?.data?.testimony);
      this.projectService.sendMessageFaqs(data?.data?.faq);
      this.projectService.setmeta(data?.data);

    });
  }


  moveToSlide(pageIndex: number) {
    this.currentIndex = pageIndex; // set the page index
  }

  get translateY(): string {
    const itemHeight = 140; // height of 1 slide (px) adjust as per your design
    return `translateY(-${this.currentIndex * this.itemsPerPage * itemHeight}px)`;
  }

  get totalPages(): number {
    // return Math.ceil(this.photoGalleryData.length / this.itemsPerPage);
    return Math.ceil((this.photoGalleryData?.length || 0) / this.itemsPerPage);
  }
  getPhoto_data() {
    this.spinner.show();
    let tbody = {
      Type: "PhotoGallery",
      pageurl: '',
      Project_Id: this.projectId
    };
    this._service.getContentDataList(tbody).subscribe((data: any) => {

      if (data?.data[0]?.contentData) {
        let res = data.data[0].contentData
        this.photoGalleryData = JSON.parse(res);
        this.getFirstData = this.photoGalleryData[0].logofiles ? this.photoGalleryData[0].logofiles : this.photoGalleryData[0].logofiles;
        this.alldata = JSON.parse(res);
        this.spinner.hide();
      } else {
        this.photoGalleryData = [];
        this.alldata = [];
      }
      if (data?.data[0]?.AssignCategory) {
        this.Assinedcategory = JSON.parse(data?.data[0]?.AssignCategory)
      } else {
        this.Assinedcategory = [];
      }
    });
  }
  onSearchChange(event: Event) {
    const value = (event.target as HTMLInputElement).value;
    this.photoGalleryData = this.alldata.filter((item: any) =>
      item?.Title?.toLowerCase().includes(value?.toLowerCase())
    );
    this.getFirstData = this.photoGalleryData[0].OtherFiles ? this.photoGalleryData[0].OtherFiles : this.photoGalleryData[0].logofiles;
  }

  onchangecategory(id: string) {
    if (id != "") {
      this.photoGalleryData = this.alldata.filter((dt: any) => {
        return dt.category.includes(id);

      }).map((obj: any) => {
        return obj;
      });
      this.getFirstData = this.photoGalleryData[0].OtherFiles ? this.photoGalleryData[0].OtherFiles : this.photoGalleryData[0].logofiles;
    }
    else {
      this.photoGalleryData = this.alldata;
      this.getFirstData = this.photoGalleryData[0].OtherFiles ? this.photoGalleryData[0].OtherFiles : this.photoGalleryData[0].logofiles;
    }
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

  getVideo_data() {
    this.spinner.show();
    let tbody = {
      Type: "VideoGallery",
      pageurl: '',
      Project_Id: this.projectId
    };
    this._service.getContentDataList(tbody).subscribe((data: any) => {
      this.videoList = JSON.parse(data.data[0].contentData)
      this.videoGalleryList = this.videoList.map((video: any) => ({
        ...video,
        title: video.Title,
        safeUrl: this.getSafeEmbedUrl(video.slug),
      }));
    });
  }

  getSafeEmbedUrl(url: string): SafeResourceUrl {
    let videoId = url;
    if (url) {
      // if (url.includes('youtu.be/')) {
      //   videoId = url.split('youtu.be/')[1];
      // } else if (url.includes('watch?v=')) {
      //   videoId = new URL(url).searchParams.get('v') || '';
      // } else if (url.includes('embed/')) {
      //   videoId = url.split('embed/')[1];
      // }
      const embedUrl = `https://www.youtube.com/embed/${videoId}`;
      return this.sanitizer.bypassSecurityTrustResourceUrl(embedUrl);
    } else {
      return ''
    }

  }

}
