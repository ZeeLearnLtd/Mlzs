import { Component, OnInit, AfterViewInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable, Subscription, of, switchMap, tap } from 'rxjs';
import { ApicallService } from 'src/app/services/apicall.service';
import { HomeSeoService } from 'src/app/services/homeseo.service';
import { ProjectSeoService } from 'src/app/services/projectseo.service';
import { environment } from 'src/environments/environment';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { NgxSpinnerService } from "ngx-spinner";
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
  slides: any[] = [];
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
  totalPages: number = 0;
  selectedCategoryId: any;
  currentIndex = 0;
  interval: any;
  searchValue: string = '';
  currentIndexMap: { [categoryId: string]: number } = {};
  lgImg: any;
  show_img: any;
  constructor(
    private route: ActivatedRoute,
    private seoService: HomeSeoService,
    private projectService: ProjectSeoService,
    private apiService: ApicallService,
    private _service: ApicallService,
    private sanitizer: DomSanitizer,
    private spinner: NgxSpinnerService,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {

  }
  ngOnInit(): void {
    this.getseo()

  }

  ngAfterViewInit(): void {
    if (isPlatformBrowser(this.platformId)) {
      setTimeout(() => {
        $('.vertical_carousel').owlCarousel({
          loop: true,
          margin: 10,
          items: 1,
          nav: false,
          animateOut: 'slideOutUp',
          animateIn: 'slideInUp'
        })

      }, 1000)

      if (isPlatformBrowser(this.platformId)) {
        setTimeout(() => {
          var owl = $(".news_owl");
          owl.owlCarousel({
            margin: 10,
            loop: true,
            nav: false,
            center: true,
            responsive: {
              0: {
                items: 1,
              },
              600: {
                items: 2,
              },
              1000: {
                items: 3,
              },
            }
          });
        }, 2000);
      }
    }

  }

  prepareCategoryWiseData() {
    this.categoryWiseData = this.categoryWiseData.map((x: any) => ({
      ...x,
      totalPages: Math.ceil(x.blogsContent.length / 3)
    }));
  }
  moveToSlide(categoryId: any, pageIndex: number) {
    // this.currentIndex = pageIndex * 3;
    this.currentIndexMap[categoryId] = pageIndex * 3;
  }
  getTranslateY(categoryId: any): string {
    const index = this.currentIndexMap[categoryId] || 0;
    return `translateY(-${index * 180}px)`;
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
    this.spinner.show();
    let tbody = {
      Type: "blog",
      pageurl: '',
      Project_Id: this.projectId
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
        console.log('categoryWiseData', this.categoryWiseData);
        this.lgImg = this.categoryWiseData[0].blogsContent

        this.prepareCategoryWiseData();
        this.spinner.hide();
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
    this.categoryWiseData = this.categoryWiseData.blogsContent.filter((item: any) =>
      item?.Title?.toLowerCase().includes(value?.toLowerCase())
    );
    this.firstBlog = this.blogsData[0].OtherFiles ? this.blogsData[0].OtherFiles : this.blogsData[0].logofiles;
  }


  // filterBlogs(category: any) {
  //   if (!this.searchValue) {
  //     category.blogsContent = this.categoryWiseData.find((c: any) => c.categoryId === category.categoryId).blogsContent;
  //     return;
  //   }

  //   category.blogsContent = this.categoryWiseData
  //     .find((c: any) => c.categoryId === category.categoryId)
  //     .blogsContent.filter((blog: any) =>
  //       blog.Title.toLowerCase().includes(this.searchValue.toLowerCase())
  //     );
  // }
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
      this.prepareCategoryWiseData();
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

      this.prepareCategoryWiseData();
    }
  }

  // getBlogsItem(item: any) {
  //   this.lgImg = [item];
  //   this.show_img = this.lgImg;
  //   console.log('lgImg', this.lgImg);
  // }

  selectedIndexMap: { [categoryId: number]: number } = {};

  getBlogsItem(categoryId: number, index: number) {
    this.selectedIndexMap[categoryId] = index;
  }

}
