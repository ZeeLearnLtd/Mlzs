import { Component, OnInit, AfterViewInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable, Subscription, of, switchMap, tap } from 'rxjs';
import { ApicallService } from 'src/app/services/apicall.service';
import { HomeSeoService } from 'src/app/services/homeseo.service';
import { ProjectSeoService } from 'src/app/services/projectseo.service';
import { environment } from 'src/environments/environment';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { isPlatformBrowser } from '@angular/common';
import { Inject, PLATFORM_ID } from '@angular/core';
import { tns } from 'tiny-slider/src/tiny-slider';
declare var $: any;  // Declare jQuery
@Component({
  selector: 'app-discover-blogs',
  templateUrl: './discover-blogs.component.html',
  styleUrls: ['./discover-blogs.component.css']
})
export class DiscoverBlogsComponent {
  projectId = environment.projectid
  project$: Observable<any> | undefined;
  subscriptionnav!: Subscription;
  testimonydata: any;
  testimonialData: any = [];
  testimonialDataList: any;
  blogsData: any;
  firstBlog: any;
  Selectedcategory: string = "";
  blogcategory: any = [];
  alldata: any = [];
  categoriesList: any;
  categoryWiseData: any;
  selectedCategoryId: any;
  constructor(
    private route: ActivatedRoute,
    private seoService: HomeSeoService,
    private projectService: ProjectSeoService,
    private apiService: ApicallService,
    private _service: ApicallService,
    private sanitizer: DomSanitizer,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {
    //
  }
  slides = [
    { id: 0 }, { id: 1 }, { id: 2 },
    { id: 3 }, { id: 4 }, { id: 5 }, { id: 6 }
  ];
  ngAfterViewInit(): void {
    setTimeout(() => { // wait for *ngFor DOM render
      this.categoryWiseData.forEach((_: any, index: any) => {
        tns({
          container: `#slider-${index}`,
          items: 3,
          axis: 'vertical',
          swipeAngle: true,
          speed: 400,
          mouseDrag: true,
          controls: true,
          nav: false
        });
      });
    }, 0);
  }


  // ngAfterViewInit(): void {
  //   if (isPlatformBrowser(this.platformId)) {
  //     setTimeout(() => {
  //       const owl = $('.news_owl');
  //       owl.owlCarousel({
  //         items: 3,
  //         margin: 25,
  //         loop: true,
  //         nav: false,
  //         dots: true,
  //         autoplay: true,
  //         autoplayTimeout: 3000,
  //         smartSpeed: 500,
  //         responsive: {
  //           0: { items: 1 },
  //           600: { items: 2 },
  //           1000: { items: 3 }
  //         }
  //       });
  //     }, 500);
  //   }
  // }
  ngOnInit(): void {
    // this.getBlogContentData();
    this.getseo()

  }

  getseo() {
    let tbody = {
      slug: 'blogs',
      Projectid: environment.projectid,
    };
    this.apiService.getGetseo(tbody).subscribe((data: any) => {
      this.getnews_data();
      this.projectService.sendMessagebread(data.data.breadcrumb);
      this.projectService.sendMessageblog(data?.data?.blog);
      this.projectService.sendMessageseo(data?.data?.testimony);
      this.projectService.sendMessageFaqs(data?.data?.faq);
      this.projectService.setmeta(data?.data);

    });
  }
  getnews_data() {
    let tbody = {
      Type: "blog",
      pageurl: '',
      Project_Id: 1
    };
    this._service.getContentDataList(tbody).subscribe((data: any) => {
      if (data?.data[0]?.contentData) {
        let res = data.data[0].contentData
        this.blogsData = JSON.parse(res);
        this.firstBlog = this.blogsData[0].OtherFiles ? this.blogsData[0].OtherFiles : this.blogsData[0].logofiles;
        this.alldata = JSON.parse(res);
        this.categoriesList = JSON.parse(data.data[0].AssignCategory);
        this.categoryWiseData = this.categoriesList.map((cat: any) => ({
          ...cat,
          blogsContent: this.alldata.filter((news: any) =>
            (Array.isArray(news.category) && news.category.includes(cat.categoryId)) ||
            (typeof news.category === 'string' && news.category.split(',').map(Number).includes(cat.categoryId)) ||
            (typeof news.category === 'number' && news.category === cat.categoryId)
          )
        }));

      } else {
        this.blogsData = [];
        this.alldata = [];
      }
      if (data?.data[0]?.AssignCategory) {
        this.blogcategory = JSON.parse(data?.data[0]?.AssignCategory)
      } else {
        this.blogcategory = [];
      }
    });

  }

  onSearchChange(event: Event) {
    const value = (event.target as HTMLInputElement).value;
//    console.log('Search input changed:', value);

    this.blogsData = this.alldata.filter((item: any) =>
      item?.Title?.toLowerCase().includes(value?.toLowerCase())
    );
    this.firstBlog = this.blogsData[0].OtherFiles ? this.blogsData[0].OtherFiles : this.blogsData[0].logofiles;
  }

  onchangecategory(id: any) {
    this.selectedCategoryId = Number(id);
    if (!this.selectedCategoryId) {
      this.categoryWiseData = this.categoriesList.map((cat: any) => ({
        ...cat,
        blogsContent: this.alldata.filter((news: any) =>
          (Array.isArray(news.category) && news.category.includes(cat.categoryId)) ||
          (typeof news.category === 'string' && news.category.split(',').map(Number).includes(cat.categoryId)) ||
          (typeof news.category === 'number' && news.category === cat.categoryId)
        )
      }));
    } else {
      this.categoryWiseData = this.categoriesList
        .filter((cat: any) => cat.categoryId === this.selectedCategoryId)
        .map((cat: any) => ({
          ...cat,
          blogsContent: this.alldata.filter((news: any) =>
            (Array.isArray(news.category) && news.category.includes(cat.categoryId)) ||
            (typeof news.category === 'string' && news.category.split(',').map(Number).includes(cat.categoryId)) ||
            (typeof news.category === 'number' && news.category === cat.categoryId)
          )
        }));
    }
  }

}
