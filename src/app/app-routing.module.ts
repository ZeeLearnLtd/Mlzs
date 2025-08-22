import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { HeaderComponent } from './components/common/header/header.component';
import { LegancyComponent } from './components/legancy/legancy.component';
import { AdmissionsComponent } from './components/admissions/admissions.component';
import { FranchiseOpportunityComponent } from './components/franchise-opportunity/franchise-opportunity.component';
import { BlogComponent } from './components/blog/blog/blog.component';
import { PentemindComponent } from './components/pentemind/pentemind.component';
import { PlayGroupComponent } from './components/play-group/play-group.component';
import { NurseryComponent } from './components/nursery/nursery.component';
import { KindergartenComponent } from './components/kindergarten/kindergarten.component';
import { TeacherTrainingComponent } from './components/teacher-training/teacher-training.component';
import { DayCareComponent } from './components/day-care/day-care.component';
import { OurApproachComponent } from './components/our-approach/our-approach.component';
import { AwardsAndRecognitionComponent } from './components/awards-and-recognition/awards-and-recognition.component';
import { LocateUsComponent } from './components/locate-us/locate-us.component';
import { PartnerLandingComponent } from './components/partner-landing/partner-landing.component';
import { AdmissionThankyouComponent } from './components/thank-you/admission-thankyou/admission-thankyou.component';
import { FranchiseThankyouComponent } from './components/thank-you/franchise-thankyou/franchise-thankyou.component';
import { BlogDetailsComponent } from './components/blog/blog-details/blog-details.component';
import { PrivacyPolicyComponent } from './components/privacy-policy/privacy-policy.component';
import { PreschoolInCityComponent } from './components/preschool-in-city/preschool-in-city.component';
import { PagenotfoundComponent } from './components/pagenotfound/pagenotfound.component';
import { ProgrammesMainPageComponent } from './components/programmes-main-page/programmes-main-page.component';
import { AcademicsBeyondComponent } from './components/academics-beyond/academics-beyond.component';
import { StartSchoolComponent } from './components/start-school/start-school.component';
import { ParentsCornerComponent } from './components/parents-corner/parents-corner.component';
import { ContectUsComponent } from './components/contect-us/contect-us.component';
import { DiscoverMoreComponent } from './components/discover-more/discover-more.component';
import { OurLegacyComponent } from './components/about-us-sub-page/our-legacy/our-legacy.component';
import { AwardsAndRecognitionsComponent } from './components/about-us-sub-page/awards-and-recognitions/awards-and-recognitions.component';
import { OurPhilosophyComponent } from './components/about-us-sub-page/our-philosophy/our-philosophy.component';
import { OurVisionComponent } from './components/about-us-sub-page/our-vision/our-vision.component';
import { AboutUsComponent } from './components/about-us/about-us.component';
import { LiteraFoundationalStage1Component } from './components/programmes-sub-page/litera-foundational-stage1/litera-foundational-stage1.component';
import { LiteraFoundationalStage2Component } from './components/programmes-sub-page/litera-foundational-stage2/litera-foundational-stage2.component';
import { LiteraMiddleStageComponent } from './components/programmes-sub-page/litera-middle-stage/litera-middle-stage.component';
import { LiteraPreparatoryStageComponent } from './components/programmes-sub-page/litera-preparatory-stage/litera-preparatory-stage.component';
import { LiteraSecondaryStageComponent } from './components/programmes-sub-page/litera-secondary-stage/litera-secondary-stage.component';
import { CoCurricularAndEnrichmentProgrammesComponent } from './components/academics-beyond-sub-page/co-curricular-and-enrichment-programmes/co-curricular-and-enrichment-programmes.component';
import { LiteraExpComponent } from './components/academics-beyond-sub-page/litera-exp/litera-exp.component';
import { LiteraNovaAppComponent } from './components/academics-beyond-sub-page/litera-nova-app/litera-nova-app.component';
import { LiteratiComponent } from './components/academics-beyond-sub-page/literati/literati.component';
import { ChildDevelopmentComponent } from './components/parents-corner-sub-page/child-development/child-development.component';
import { MountLiteraExpertConnectComponent } from './components/parents-corner-sub-page/mount-litera-expert-connect/mount-litera-expert-connect.component';
import { MountLiteraParentSupportHubComponent } from './components/parents-corner-sub-page/mount-litera-parent-support-hub/mount-litera-parent-support-hub.component';
import { ParentsTestimonialsComponent } from './components/parents-corner-sub-page/parents-testimonials/parents-testimonials.component';
import { DiscoverEventsComponent } from './components/discover-sub-page/discover-events/discover-events.component';
import { DiscoverGalleryComponent } from './components/discover-sub-page/discover-gallery/discover-gallery.component';
import { DiscoverNewsComponent } from './components/discover-sub-page/discover-news/discover-news.component';
import { BlogsComponent } from './components/blogs/blogs.component';
import { DiscoverFaqsComponent } from './components/discover-sub-page/discover-faqs/discover-faqs.component';
import { DiscoverBlogsComponent } from './components/discover-sub-page/discover-blogs/discover-blogs.component';
import { DiscoverTestimonialsComponent } from './components/discover-sub-page/discover-testimonials/discover-testimonials.component';
import { DiscoverAchievementsComponent } from './components/discover-sub-page/discover-achievements/discover-achievements.component';
import { TestimonialComponent } from './components/testimonial/testimonial.component';
import { NewsDetailsComponent } from './components/discover-sub-page/news-details/news-details.component';
import { EventsDetailsComponent } from './components/discover-sub-page/events-details/events-details.component';
import { CurriculumComponent } from './components/curriculum/curriculum.component';
import { PartnerWithUsComponent } from './components/partner-with-us/partner-with-us.component';
import { ConvertToMLZSComponent } from './components/convert-to-mlzs/convert-to-mlzs.component';
const routes: Routes = [
  { path: 'admission/thankyou', component: AdmissionThankyouComponent },
  { path: 'franchise/thankyou', component: FranchiseThankyouComponent },
  {
    path: '',
    component: HeaderComponent,
    children: [
      { path: '', component: HomeComponent },
      { path: 'programmes', component: ProgrammesMainPageComponent },
      { path: 'academics', component: LiteraExpComponent },
      { path: 'academics-beyond/litera-enrichment-programmes', component: AcademicsBeyondComponent },
      { path: 'start-school', component: StartSchoolComponent },
      { path: 'parents-corner', component: ParentsCornerComponent },
      { path: 'admissions', component: AdmissionsComponent },
      { path: 'contact-us', component: ContectUsComponent },
      { path: 'convert-to-an-mlzs', component: ConvertToMLZSComponent },
      { path: 'about-us', component: AboutUsComponent },
      { path: 'discover-more', component: DiscoverMoreComponent },
      { path: 'about-us/legacy', component: OurLegacyComponent },
      { path: 'about-us/vision', component: OurVisionComponent },
      { path: 'locateUs', component: LocateUsComponent },
      { path: 'about-us/our-philosophy', component: OurPhilosophyComponent },
      { path: 'about-us/awards-recognitions', component: AwardsAndRecognitionsComponent },
      { path: 'programmes/litera-foundational-stage-1', component: LiteraFoundationalStage1Component },
      { path: 'programmes/litera-foundational-stage-2', component: LiteraFoundationalStage2Component },
      { path: 'programmes/litera-preparatory-stage', component: LiteraPreparatoryStageComponent },
      { path: 'programmes/middle-school', component: LiteraMiddleStageComponent },
      { path: 'programmes/secondary-school', component: LiteraSecondaryStageComponent },
      { path: 'academics/students-experience', component: LiteraExpComponent },
      { path: 'academics/co-curricular-activities', component: CoCurricularAndEnrichmentProgrammesComponent },
      { path: 'academics/literati', component: LiteraNovaAppComponent },
      { path: 'academics/nova', component: LiteratiComponent },

      { path: 'parents-corner/childs-development', component: ChildDevelopmentComponent },
      { path: 'parents-corner/personalized-guidance', component: MountLiteraExpertConnectComponent },
      { path: 'parents-corner/support', component: MountLiteraParentSupportHubComponent },
      { path: 'parents-corner/parents-experience', component: ParentsTestimonialsComponent },
      { path: 'news', component: DiscoverNewsComponent },
      { path: 'events', component: DiscoverEventsComponent },
      { path: 'gallery', component: DiscoverGalleryComponent },
      { path: 'blogs', component: DiscoverBlogsComponent },
      { path: 'blog/:name', component: BlogDetailsComponent },
      { path: 'news/:name', component: NewsDetailsComponent },
      { path: 'events/:name', component: EventsDetailsComponent },
      { path: 'faqs', component: DiscoverFaqsComponent },
      { path: 'testimonials', component: DiscoverTestimonialsComponent },
      { path: 'achievements', component: DiscoverAchievementsComponent },
      { path: 'curriculum', component: CurriculumComponent },
      { path: 'partner-with-us', component: PartnerWithUsComponent },
    ],
  },
  { path: 'admission/thankyou', component: AdmissionThankyouComponent },
  { path: 'franchise/thankyou', component: FranchiseThankyouComponent },
  { path: '**', pathMatch: 'full', component: PagenotfoundComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
