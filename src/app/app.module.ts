import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { HomeComponent } from './components/home/home.component';
import { BlogsComponent } from './components/blogs/blogs.component';
import { HeaderComponent } from './components/common/header/header.component';
import { FooterComponent } from './components/common/footer/footer.component';
import { LegancyComponent } from './components/legancy/legancy.component';
import { NewsComponent } from './components/news/news.component';
import { FaqsComponent } from './components/faqs/faqs.component';
import { AboutUsComponent } from './components/about-us/about-us.component';
import { KidzeePreeSchoolComponent } from './components/kidzee-pree-school/kidzee-pree-school.component';
import { TestimonialComponent } from './components/testimonial/testimonial.component';
import { AdmissionsComponent } from './components/admissions/admissions.component';
import { FranchiseOpportunityComponent } from './components/franchise-opportunity/franchise-opportunity.component';
import { BlogComponent } from './components/blog/blog/blog.component';
import { AllBlogComponent } from './components/blog/all-blog/all-blog.component';
import { BlogDetailsComponent } from './components/blog/blog-details/blog-details.component';
import { StaticHeaderComponent } from './components/common/static-header/static-header.component';
import { SubMenuComponent } from './components/common/sub-menu/sub-menu.component';
import { PentemindComponent } from './components/pentemind/pentemind.component';
import { PlayGroupComponent } from './components/play-group/play-group.component';
import { NurseryComponent } from './components/nursery/nursery.component';
import { KindergartenComponent } from './components/kindergarten/kindergarten.component';
import { TeacherTrainingComponent } from './components/teacher-training/teacher-training.component';
import { DayCareComponent } from './components/day-care/day-care.component';
import { LocateUsComponent } from './components/locate-us/locate-us.component';
import { OurApproachComponent } from './components/our-approach/our-approach.component';
import { AwardsAndRecognitionComponent } from './components/awards-and-recognition/awards-and-recognition.component';
import { ProgrammesComponent } from './components/programmes/programmes.component';
import { AdmissionsFormComponent } from './components/admissions-form/admissions-form.component';
import { CentersInAgartalaComponent } from './components/centers-in-agartala/centers-in-agartala.component';
import { PartnerLandingComponent } from './components/partner-landing/partner-landing.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { CommonHeaderComponent } from './components/common/common-header/common-header.component';
import { AdmissionThankyouComponent } from './components/thank-you/admission-thankyou/admission-thankyou.component';
import { FranchiseThankyouComponent } from './components/thank-you/franchise-thankyou/franchise-thankyou.component';
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { NgxSpinnerModule } from "ngx-spinner";
import { PagenotfoundComponent } from './components/pagenotfound/pagenotfound.component';
import { PrivacyPolicyComponent } from './components/privacy-policy/privacy-policy.component';
import { MatExpansionModule } from '@angular/material/expansion';
import { PreschoolInCityComponent } from './components/preschool-in-city/preschool-in-city.component';
import { PartneradmissionComponent } from './components/partneradmission/partneradmission.component';
import { ProgrammesListComponent } from './components/programmes-list/programmes-list.component';
import { HomeAboutUsComponent } from './components/home-about-us/home-about-us.component';
import { SliderParentsComponent } from './components/slider-parents/slider-parents.component';
import { OurParentsComponent } from './components/our-parents/our-parents.component';
import { SocialWallComponent } from './components/social-wall/social-wall.component';
import { ProgrammesMainPageComponent } from './components/programmes-main-page/programmes-main-page.component';
import { AcademicsBeyondComponent } from './components/academics-beyond/academics-beyond.component';
import { LiteraExperienceComponent } from './components/litera-experience/litera-experience.component';
import { StartSchoolComponent } from './components/start-school/start-school.component';
import { GalleryComponent } from './components/gallery/gallery.component';
import { ParentsCornerComponent } from './components/parents-corner/parents-corner.component';
import { ContectUsComponent } from './components/contect-us/contect-us.component';
import { LocateASchoolComponent } from './components/locate-aschool/locate-aschool.component';
import { DiscoverMoreComponent } from './components/discover-more/discover-more.component';
import { OurPedagogyComponent } from './our-pedagogy/our-pedagogy.component';
import { OurLegacyComponent } from './components/about-us-sub-page/our-legacy/our-legacy.component';
import { OurVisionComponent } from './components/about-us-sub-page/our-vision/our-vision.component';
import { OurPhilosophyComponent } from './components/about-us-sub-page/our-philosophy/our-philosophy.component';
import { AwardsAndRecognitionsComponent } from './components/about-us-sub-page/awards-and-recognitions/awards-and-recognitions.component';
import { LiteraFoundationalStage1Component } from './components/programmes-sub-page/litera-foundational-stage1/litera-foundational-stage1.component';
import { LiteraFoundationalStage2Component } from './components/programmes-sub-page/litera-foundational-stage2/litera-foundational-stage2.component';
import { LiteraPreparatoryStageComponent } from './components/programmes-sub-page/litera-preparatory-stage/litera-preparatory-stage.component';
import { LiteraMiddleStageComponent } from './components/programmes-sub-page/litera-middle-stage/litera-middle-stage.component';
import { LiteraSecondaryStageComponent } from './components/programmes-sub-page/litera-secondary-stage/litera-secondary-stage.component';
import { CoCurricularAndEnrichmentProgrammesComponent } from './components/academics-beyond-sub-page/co-curricular-and-enrichment-programmes/co-curricular-and-enrichment-programmes.component';
import { LiteraNovaAppComponent } from './components/academics-beyond-sub-page/litera-nova-app/litera-nova-app.component';
import { LiteratiComponent } from './components/academics-beyond-sub-page/literati/literati.component';
import { LiteraExpComponent } from './components/academics-beyond-sub-page/litera-exp/litera-exp.component';
import { ChildDevelopmentComponent } from './components/parents-corner-sub-page/child-development/child-development.component';
import { MountLiteraExpertConnectComponent } from './components/parents-corner-sub-page/mount-litera-expert-connect/mount-litera-expert-connect.component';
import { MountLiteraParentSupportHubComponent } from './components/parents-corner-sub-page/mount-litera-parent-support-hub/mount-litera-parent-support-hub.component';
import { ParentsTestimonialsComponent } from './components/parents-corner-sub-page/parents-testimonials/parents-testimonials.component';
import { DiscoverEventsComponent } from './components/discover-sub-page/discover-events/discover-events.component';
import { DiscoverGalleryComponent } from './components/discover-sub-page/discover-gallery/discover-gallery.component';
import { DiscoverNewsComponent } from './components/discover-sub-page/discover-news/discover-news.component';
import { DiscoverFaqsComponent } from './components/discover-sub-page/discover-faqs/discover-faqs.component';
import { DiscoverBlogsComponent } from './components/discover-sub-page/discover-blogs/discover-blogs.component';
import { DiscoverTestimonialsComponent } from './components/discover-sub-page/discover-testimonials/discover-testimonials.component';
import { DiscoverAchievementsComponent } from './components/discover-sub-page/discover-achievements/discover-achievements.component';
import { MapviewComponent } from './components/mapview/mapview.component';

interface NgxSpinnerConfig {
  type?: string;
}
@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    BlogsComponent,
    HeaderComponent,
    FooterComponent,
    LegancyComponent,
    NewsComponent,
    FaqsComponent,
    AboutUsComponent,
    HomeAboutUsComponent,
    KidzeePreeSchoolComponent,
    TestimonialComponent,
    AdmissionsComponent,
    FranchiseOpportunityComponent,
    BlogComponent,
    AllBlogComponent,
    BlogDetailsComponent,
    StaticHeaderComponent,
    SubMenuComponent,
    PentemindComponent,
    PlayGroupComponent,
    NurseryComponent,
    KindergartenComponent,
    TeacherTrainingComponent,
    DayCareComponent,
    LocateUsComponent,
    OurApproachComponent,
    AwardsAndRecognitionComponent,
    ProgrammesComponent,
    AdmissionsFormComponent,
    PreschoolInCityComponent,
    CentersInAgartalaComponent,
    PartnerLandingComponent,
    CommonHeaderComponent,
    FranchiseThankyouComponent,
    AdmissionThankyouComponent,
    PagenotfoundComponent,
    PrivacyPolicyComponent,
    PartneradmissionComponent,
    ProgrammesListComponent,
    ProgrammesMainPageComponent,
    SliderParentsComponent,
    OurParentsComponent,
    SocialWallComponent,
    AcademicsBeyondComponent,
    LiteraExperienceComponent,
    GalleryComponent,
    StartSchoolComponent,
    ParentsCornerComponent,
    ContectUsComponent,
    LocateASchoolComponent,
    DiscoverMoreComponent,
    OurPedagogyComponent,
    OurLegacyComponent,
    OurVisionComponent,
    OurPhilosophyComponent,
    AwardsAndRecognitionsComponent,
    LiteraFoundationalStage1Component,
    LiteraFoundationalStage2Component,
    LiteraPreparatoryStageComponent,
    LiteraMiddleStageComponent,
    LiteraSecondaryStageComponent,
    CoCurricularAndEnrichmentProgrammesComponent,
    LiteraNovaAppComponent,
    LiteratiComponent,
    LiteraExpComponent,
    ChildDevelopmentComponent,
    MountLiteraExpertConnectComponent,
    MountLiteraParentSupportHubComponent,
    ParentsTestimonialsComponent,
    DiscoverEventsComponent,
    DiscoverGalleryComponent,
    DiscoverNewsComponent,
    DiscoverFaqsComponent,
    DiscoverBlogsComponent,
    DiscoverTestimonialsComponent,
    DiscoverAchievementsComponent,
    MapviewComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    NgxSpinnerModule,
    MatExpansionModule,
    NgxSpinnerModule.forRoot({ type: 'ball-scale-multiple' }),
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule { }

