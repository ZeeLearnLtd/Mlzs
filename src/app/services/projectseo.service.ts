import { Injectable } from '@angular/core';
import { RES, toFormat } from '../resources';
import { IListParams, IProject } from './models';
import { SeoService } from './SeoService';
import { BehaviorSubject, Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ProjectSeoService extends SeoService {
  private blogsubject = new Subject<any>();
  private newssubject = new Subject<any>();
  private seosubject = new Subject<any>();
  private breadsubject = new Subject<any>();
  private Faqssubject = new Subject<any>();
  private searchMessage = new BehaviorSubject<string>('');
  currentMessage = this.searchMessage.asObservable();
  // sendMessagenews(message: string) {
  //   this.newssubject.next({ text: message });
  // }

  // clearnewssubject() {
  //   this.newssubject.next({});
  // }
  sendMessageblog(message: string) {
    this.blogsubject.next({ text: message });
  }
  sendMessagebread(message: string) {
    this.breadsubject.next({ text: message });
  }
  sendMessageFaqs(message: string) {
    this.Faqssubject.next({ text: message });
  }
  sendMessageNews(message: string) {
    this.newssubject.next({ text: message });
  }

  clearbreadsubject() {
    this.breadsubject.next({});
  }
  clearFaqssubject() {
    this.Faqssubject.next({});
  }
  clearNewssubject() {
    this.newssubject.next({});
  }
  clearblogsubject() {
    this.blogsubject.next({});
  }
  sendMessageseo(message: string) {
    this.seosubject.next({ text: message });
  }

  clearseosubject() {
    this.seosubject.next({});
  }
  onblogMessage(): Observable<any> {
    return this.blogsubject.asObservable();
  }
  onbreadMessage(): Observable<any> {
    return this.breadsubject.asObservable();
  }
  onFaqsMessage(): Observable<any> {
    return this.Faqssubject.asObservable();
  }
  onNewsMessage(): Observable<any> {
    return this.newssubject.asObservable();
  }
  onseoMessage(): Observable<any> {
    return this.seosubject.asObservable();
  }
  setmeta(meta: any) {
    // set title
    this.setTitle(meta?.MetaTitle);

    // set url
    this.setcurl(meta?.MetaUrl);
    this.setkeyword(meta?.MetaKeyword);
    // set description
    this.setDescription(meta?.MetaDescription);

    // set image
    this.setImage(meta?.MetaImageurl);
    if (meta?.breadcrumb != null && meta?.breadcrumb != undefined) {
      const arr = meta?.breadcrumb.map((item: any) => {
        return {
          '@type': 'ListItem',
          position: item.position,
          name: item?.name,
          item: item?.url,
        };
      });
      this.updateJsonSnippet({
        '@type': 'BreadcrumbList',
        itemListElement: arr,
      });
    }
    // empty first
    //this.emptyJsonSnippet();

    // this.updateJsonSnippet({
    //   '@type': 'Article',
    //   headline: meta?.MetaTitle,
    //   image: meta?.MetaImageurl,
    //   datePublished: meta?.dateCreated,
    //   author: [
    //     {
    //       '@type': 'Organization',
    //       name: RES.SITE_NAME,
    //       url: this.defaultUrl,
    //     },
    //   ],
    // });

    // add a breadcrumb: Turtles > Turtle Rock
    //this.updateJsonSnippet(meta.breadcrumb);
  }

   setmeta_programme(meta: any,programme_name:string,educationalLevel:string) {
    // set title
    this.setTitle(meta?.MetaTitle);

    // set url
    this.setcurl(meta?.MetaUrl);
    this.setkeyword(meta?.MetaKeyword);
    // set description
    this.setDescription(meta?.MetaDescription);

    // set image
    this.setImage(meta?.MetaImageurl);
    if (meta.breadcrumb != null && meta.breadcrumb != undefined) {
      const arr = meta.breadcrumb.map((item: any) => {
        return {
          '@type': 'ListItem',
          position: item.position,
          name: item.name,
          item: item.url,
        };
      });
      this.updateJsonSnippet({
        '@type': 'BreadcrumbList',
        itemListElement: arr,
      });
    }
    this.updateJsonSnippet({
        "@type": "Course",
        "name": programme_name,
        "description":meta?.MetaDescription,
        "educationalLevel": educationalLevel,
        "provider": {
          "@type": "School",
          "name": "Mount Litera Zee School",
          "sameAs": "https://www.mountlitera.com"
        },
        "hasCourseInstance": [{
          "@type": "CourseInstance",
          "courseMode": "InPerson",
          "url": meta?.MetaUrl
        }]
    });
  }
  setmeta_hyperlocal(meta: any) {
    
    this.updateJsonSnippet({
       "@type": "EducationalOrganization",
        "name": meta?.Franchisee_Name,
        "url": 'https://mountlitera.com/'+meta?.franchiseeslug,
        "description": "Mount Litera Zee School is among the best CBSE schools in "+ meta?.City_Name+", "+ meta?.State_Name+" offering quality education, skilled faculty and all-round student development. Enquire now.",
        "address": {
          "@type": "PostalAddress",
          "streetAddress": meta?.Address1 + meta?.Address2,
          "addressLocality": meta?.City_Name,
          "addressRegion":meta?.State_Name,
          "postalCode": meta?.Pin_Code,
          "addressCountry": "IN"
        },
        "telephone": meta?.Mobile_No,
        "areaServed": {
          "@type": "Place",
          "name": meta?.Place+','+ meta?.City_Name,
        },
        "parentOrganization": [{
          "@type": "EducationalOrganization",
          "name": "Mount Litera Zee School",
          "url": "https://mountlitera.com/"
        }]
    });
  }
  setmetablog(meta: any) {
    // set title
    this.setTitle(meta?.MetaTitle);

    // set url
    this.setcurl(meta?.MetaUrl);
    this.setkeyword(meta?.MetaKeyword);
    // set description
    this.setDescription(meta?.MetaDescription);

    // set image
    let imageurl = meta?.files[1].url;
    this.setImage(imageurl);
    if (meta?.breadcrumb != null && meta?.breadcrumb != undefined) {
      const arr = meta?.breadcrumb.map((item: any) => {
        return {
          '@type': 'ListItem',
          position: item?.position,
          name: item?.name,
          item: item?.url,
        };
      });
      this.updateJsonSnippet({
        '@type': 'BreadcrumbList',
        itemListElement: arr,
      });
    }

    this.updateJsonSnippet({
      '@type': 'BlogPosting',
      mainEntityOfPage: {
        '@type': 'WebPage',
        '@id': meta?.MetaUrl,
      },
      headline: meta?.MetaTitle,
      description: meta?.MetaDescription,
      image: imageurl,
      author: {
        '@type': 'Organization',
        name: 'Kidzee',
        url: 'https://www.mountlitera.com/',
      },
      publisher: {
        '@type': 'Organization',
        name: 'Kidzee',
        logo: {
          '@type': 'ImageObject',
          url: 'Zeelearn',
        },
      },
      datePublished: meta?.dateCreated,
      dateModified: meta?.dateCreated,
    });

    // empty first
    //this.emptyJsonSnippet();

    // this.updateJsonSnippet({
    //   '@type': 'Article',
    //   headline: meta?.MetaTitle,
    //   image: meta?.MetaImageurl,
    //   datePublished: meta?.dateCreated,
    //   author: [
    //     {
    //       '@type': 'Organization',
    //       name: RES.SITE_NAME,
    //       url: this.defaultUrl,
    //     },
    //   ],
    // });

    // add a breadcrumb: Turtles > Turtle Rock
    //this.updateJsonSnippet(meta.breadcrumb);
  }
  changeSearchMessage(message: string) {
    this.searchMessage.next(message);
  }
}
