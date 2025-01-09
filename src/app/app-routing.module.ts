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
import { InnewsComponent } from './components/innews/innews.component';
import { PrivacyPolicyComponent } from './components/privacy-policy/privacy-policy.component';
import { PreschoolInCityComponent } from './components/preschool-in-city/preschool-in-city.component';
import { PagenotfoundComponent } from './components/pagenotfound/pagenotfound.component';
import { ProgrammesMainPageComponent } from './components/programmes-main-page/programmes-main-page.component';
import { AcademicsBeyondComponent } from './components/academics-beyond/academics-beyond.component';
import { StartSchoolComponent } from './components/start-school/start-school.component';
import { ParentsCornerComponent } from './components/parents-corner/parents-corner.component';
import { ContectUsComponent } from './components/contect-us/contect-us.component';
import { DiscoverMoreComponent } from './components/discover-more/discover-more.component';
const routes: Routes = [
  // { path: '', component: HomeComponent },
  // { path: 'blog/:name', component: BlogComponent },
  // { path: 'blog', component: BlogDetailsComponent },
  
  
  // { path: 'admission/thankyou', component: AdmissionThankyouComponent },
  // { path: 'franchise/thankyou', component: FranchiseThankyouComponent },
  {
    path: '',
    component: HeaderComponent,
    children: [
      { path: '', component: HomeComponent },
      {path:'programmes',component:ProgrammesMainPageComponent},
      {path:'academics-beyond', component:AcademicsBeyondComponent},
      {path:'start-school', component:StartSchoolComponent},
      {path:'parents-corner', component:ParentsCornerComponent},
      {path:'admissions', component:AdmissionsComponent},
      {path:'contect-us', component:ContectUsComponent},
      {path:'discover-more', component:DiscoverMoreComponent}
      // { path: 'pentemind', component: PentemindComponent },
      // { path: 'innews', component: InnewsComponent },
      // { path: 'blog/:name', component: BlogComponent },
      // { path: 'legacy', component: LegancyComponent },
      // { path: 'admissions', component: AdmissionsComponent },
      // { path: 'partner-with-kidzee', component: FranchiseOpportunityComponent },
      // { path: 'playgroup', component: PlayGroupComponent },
      // { path: 'nursery', component: NurseryComponent },
      // { path: 'kindergarten', component: KindergartenComponent },
      // {
      //   path: 'teacher-training-programme',
      //   component: TeacherTrainingComponent,
      // },
      // { path: 'Daycare', component: DayCareComponent },
      // { path: 'kidzee-advantage', component: OurApproachComponent },
      // { path: 'vision', component: VisionComponent },
      // {
      //   path: 'awards-and-recognition',
      //   component: AwardsAndRecognitionComponent,
      // },
      // { path: 'locateUs', component: LocateUsComponent },
      // {path:'PrivacyPolicy', component:PrivacyPolicyComponent},
      // { path: ':city/:partnerLanding', component: PartnerLandingComponent },
      // { path: ':city', component: PreschoolInCityComponent },
    ],
  },
  
  { path: '**', pathMatch: 'full', component: PagenotfoundComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
