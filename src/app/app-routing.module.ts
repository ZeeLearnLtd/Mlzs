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
import { AcademicsMainPageComponent } from './components/academics-beyond-sub-page/academics-main-page/academics-main-page.component';
import { SearchComponent } from './components/search/search.component';
import { TestimonialDetailsComponent } from './components/testimonial-details/testimonial-details.component';
import { TermsOfUseComponent } from './components/terms-of-use/terms-of-use.component';
import { DisclaimerComponent } from './components/disclaimer/disclaimer.component';
import { CenterpageComponent } from './components/centerpage/centerpage.component';
import { HyperLocalComponentComponent } from './components/hyper-local-component/hyper-local-component.component';
import { LocationResolver } from './services/location.resolver';
const routes: Routes = [
  //   { path: '', component: HomeComponent },
  { path: 'page-not-found', component: PagenotfoundComponent },
  { path: 'admission/thankyou', component: AdmissionThankyouComponent },
  { path: 'franchise/thankyou', component: FranchiseThankyouComponent },

  {
    path: '',
    component: HeaderComponent,
    children: [
      { path: '', component: HomeComponent },
      { path: 'academic-programs', component: ProgrammesMainPageComponent },
      { path: 'academics', component: AcademicsMainPageComponent },
      { path: 'search', component: SearchComponent },
      { path: 'academics-beyond/litera-enrichment-programmes', component: AcademicsBeyondComponent },
      { path: 'start-school', component: StartSchoolComponent },
      { path: 'parents-corner', component: ParentsCornerComponent },
      { path: 'admissions', component: AdmissionsComponent },
      { path: 'admissions/:frcode', component: AdmissionsComponent },
      //{ path: 'admissions/**', component: AdmissionsComponent }, 
      { path: 'contact-us', component: ContectUsComponent },
      { path: 'terms-of-use', component: TermsOfUseComponent },
      { path: 'privacy-policy', component: PrivacyPolicyComponent },
      { path: 'disclaimer', component: DisclaimerComponent },

      { path: 'convert-to-an-mlzs', component: ConvertToMLZSComponent },
      { path: 'about-us', component: AboutUsComponent },
      { path: 'discover-more', component: DiscoverMoreComponent },
      { path: 'about-us/legacy', component: OurLegacyComponent },
      { path: 'about-us/vision', component: OurVisionComponent },
      { path: 'locate-us', component: LocateUsComponent },
      { path: 'about-us/our-philosophy', component: OurPhilosophyComponent },
      { path: 'about-us/awards-recognitions', component: AwardsAndRecognitionsComponent },
      { path: 'academic-programs/pre-primary-school', component: LiteraFoundationalStage1Component },
      { path: 'academic-programs/primary-school', component: LiteraFoundationalStage2Component },
      { path: 'academic-programs/secondary-school', component: LiteraPreparatoryStageComponent },
      { path: 'academic-programs/middle-school', component: LiteraMiddleStageComponent },
      { path: 'academic-programs/higher-secondary-school', component: LiteraSecondaryStageComponent },
      { path: 'academics/litera-experience', component: LiteraExpComponent },
      { path: 'academics/litera-enrichment-programmes', component: CoCurricularAndEnrichmentProgrammesComponent },
      { path: 'academics/litera-nova-app', component: LiteratiComponent },
      { path: 'academics/literati', component: LiteraNovaAppComponent },

      { path: 'parents-corner/childs-development', component: ChildDevelopmentComponent },
      { path: 'parents-corner/mount-litera-expert-connect', component: MountLiteraExpertConnectComponent },
      { path: 'parents-corner/mount-litera-parent-support-hub', component: MountLiteraParentSupportHubComponent },
      { path: 'parents-corner/parents-testimonials', component: ParentsTestimonialsComponent },
      { path: 'news', component: DiscoverNewsComponent },
      // { path: 'events', component: DiscoverEventsComponent },
      { path: 'gallery', component: DiscoverGalleryComponent },
      { path: 'blogs', component: DiscoverBlogsComponent },
      { path: 'blogs/:name', component: BlogDetailsComponent },
      { path: 'news/:name', component: NewsDetailsComponent },
      { path: 'events/:name', component: EventsDetailsComponent },
      { path: 'faqs', component: DiscoverFaqsComponent },
      { path: 'testimonials', component: DiscoverTestimonialsComponent },
      { path: 'testimonials/:name', component: TestimonialDetailsComponent },

// { path: 'bihar/hajipur/best-cbse-school-hajipur',component:CenterpageComponent},
// { path: 'bihar/bhagalpur/best-cbse-school-bhagalpur',component:CenterpageComponent},
// { path: 'bihar/muzaffarpur/best-cbse-school-muzaffarpur',component:CenterpageComponent},
// { path: 'bihar/patna/best-cbse-school-patna-danapur',component:CenterpageComponent},
// { path: 'bihar/barh/best-cbse-school-barh',component:CenterpageComponent},
// { path: 'bihar/bihta/best-cbse-school-bihta',component:CenterpageComponent},
// { path: 'bihar/arah/best-cbse-school-arah-k5',component:CenterpageComponent},
// { path: 'bihar/bodh-gaya/best-cbse-school-bodh-gaya',component:CenterpageComponent},
// { path: 'bihar/lakhisarai/best-cbse-school-lakhisarai',component:CenterpageComponent},
// { path: 'bihar/begusarai/best-cbse-school-begusarai',component:CenterpageComponent},
// { path: 'bihar/patna/best-cbse-school-patna',component:CenterpageComponent},
// { path: 'bihar/arah/best-cbse-school-arah',component:CenterpageComponent},
// { path: 'jharkhand/ramgarh-cantt/best-cbse-school-ramgarh-cantt',component:CenterpageComponent},
// { path: 'odisha/tangi/best-cbse-school-tangi',component:CenterpageComponent},
// { path: 'uttar-pradesh/mathura/best-cbse-school-mathura',component:CenterpageComponent},
// { path: 'west-bengal/contai/best-cbse-school-contai',component:CenterpageComponent},
// { path: 'west-bengal/barrackpore/best-cbse-school-barrackpore',component:CenterpageComponent},
// { path: 'west-bengal/chanchal/best-cbse-school-chanchal',component:CenterpageComponent},
// { path: 'jammu-and-kashmir/jammu/best-cbse-school-jammu',component:CenterpageComponent},
// { path: 'jammu-and-kashmir/kathua/best-cbse-school-kathua',component:CenterpageComponent},
// { path: 'haryana/karnal/best-cbse-school-karnal',component:CenterpageComponent},
// { path: 'punjab/faridkot/best-cbse-school-faridkot',component:CenterpageComponent},
// { path: 'punjab/pathankot/best-cbse-school-pathankot',component:CenterpageComponent},
// { path: 'punjab/taran-taran/best-cbse-school-taran-taran-punjab',component:CenterpageComponent},
// { path: 'punjab/amritsar/best-cbse-school-amritsar',component:CenterpageComponent},
// { path: 'punjab/bathinda/best-cbse-school-bathinda',component:CenterpageComponent},
// { path: 'punjab/patiala/best-cbse-school-patiala',component:CenterpageComponent},
// { path: 'rajasthan/alwar/best-cbse-school-alwar',component:CenterpageComponent},
// { path: 'rajasthan/jaipur/best-cbse-school-jaipur',component:CenterpageComponent},
// { path: 'rajasthan/bhilwara/best-cbse-school-bhilwara',component:CenterpageComponent},
// { path: 'uttarakhand/dehradun/best-cbse-school-dehradun-doiwala-bhanewala',component:CenterpageComponent},
// { path: 'uttarakhand/roorkee/best-cbse-school-roorkee',component:CenterpageComponent},
// { path: 'uttarakhand/haridwar/best-cbse-school-haridwar',component:CenterpageComponent},
// { path: 'uttarakhand/dehradun/best-cbse-school-dehradun',component:CenterpageComponent},
// { path: 'uttar-pradesh/gorakhpur/best-cbse-school-gorakhpur',component:CenterpageComponent},
// { path: 'uttar-pradesh/ghazipur/best-cbse-school-ghazipur',component:CenterpageComponent},
// { path: 'uttar-pradesh/muzaffarnagar/best-cbse-school-muzaffarnagar',component:CenterpageComponent},
// { path: 'uttar-pradesh/farrukhabad/best-cbse-school-farrukhabad',component:CenterpageComponent},
// { path: 'uttar-pradesh/baraut/best-cbse-school-baraut',component:CenterpageComponent},
// { path: 'uttar-pradesh/lucknow/best-cbse-school-lucknow',component:CenterpageComponent},
// { path: 'uttar-pradesh/jaunpur/best-cbse-school-jaunpur',component:CenterpageComponent},
// { path: 'uttar-pradesh/jhansi/best-cbse-school-jhansi',component:CenterpageComponent},
// { path: 'telangana/hyderabad/best-cbse-school-hyderabad-lanco-hills',component:CenterpageComponent},
// { path: 'telangana/nalgonda/best-cbse-school-nalgonda',component:CenterpageComponent},
// { path: 'karnataka/bangalore/best-cbse-school-bangalore-east',component:CenterpageComponent},
// { path: 'karnataka/gulbarga/best-cbse-school-gulbarga',component:CenterpageComponent},
// { path: 'tamil-nadu/coimbatore/best-cbse-school-coimbatore',component:CenterpageComponent},
// { path: 'tamil-nadu/tirupur/best-cbse-school-tirupur',component:CenterpageComponent},
// { path: 'tamil-nadu/sivagangai/best-cbse-school-sivagangai',component:CenterpageComponent},
// { path: 'goa/goa/best-cbse-school-goa',component:CenterpageComponent},
// { path: 'gujarat/surat/best-cbse-school-surat',component:CenterpageComponent},
// { path: 'gujarat/porbandar/best-cbse-school-porbandar',component:CenterpageComponent},
// { path: 'gujarat/silvassa/best-cbse-school-silvassa',component:CenterpageComponent},
// { path: 'maharashtra/nagothane/best-cbse-school-nagothane',component:CenterpageComponent},
// { path: 'maharashtra/ahmednagar/best-cbse-school-ahmednagar',component:CenterpageComponent},
// { path: 'maharashtra/nagpur/best-cbse-school-nagpur',component:CenterpageComponent},
// { path: 'maharashtra/chandrapur/best-cbse-school-chandrapur',component:CenterpageComponent},
// { path: 'maharashtra/latur/best-cbse-school-udgir',component:CenterpageComponent},
// { path: 'maharashtra/taluka-haveli/best-cbse-school-wagholi',component:CenterpageComponent},
// { path: 'maharashtra/nashik/best-cbse-school-nashik',component:CenterpageComponent},
// { path: 'maharashtra/hingoli/best-cbse-school-hingoli',component:CenterpageComponent},
// { path: 'gujarat/gandhidham/best-cbse-school-gandhidham',component:CenterpageComponent},
// { path: 'madhya-pradesh/gwalior/best-cbse-school-gwalior',component:CenterpageComponent},
// { path: 'madhya-pradesh/jabalpur/best-cbse-school-jabalpur',component:CenterpageComponent},
// { path: 'jharkhand/deoghar/best-cbse-school-deoghar',component:CenterpageComponent},
// { path: 'jharkhand/dhanbad/best-cbse-school-dhanbad',component:CenterpageComponent},
// { path: 'jharkhand/jamshedpur/best-cbse-school-jamshedpur',component:CenterpageComponent},
// { path: 'jharkhand/hazaribagh/best-cbse-school-hazaribagh',component:CenterpageComponent},
// { path: 'madhya-pradesh/ratlam/best-cbse-school-ratlam',component:CenterpageComponent},
// { path: 'odisha/bhubaneswar/best-cbse-school-bhubaneswar',component:CenterpageComponent},
// { path: 'odisha/behrampur/best-cbse-school-behrampur',component:CenterpageComponent},
// { path: 'uttar-pradesh/alllahabad/best-cbse-school-alllahabad',component:CenterpageComponent},
// { path: 'west-bengal/maheshtala/best-cbse-school-maheshtala',component:CenterpageComponent},
// { path: 'west-bengal/uluberia/best-cbse-school-uluberia',component:CenterpageComponent},
// { path: 'uttar-pradesh/agra/best-cbse-school-agra',component:CenterpageComponent},
// { path: 'delhi/delhi/best-cbse-school-nirman-vihar-delhi',component:CenterpageComponent},
// { path: 'himachal-pradesh/arki/best-cbse-school-arki',component:CenterpageComponent},
// { path: 'haryana/panchkula/best-cbse-school-panchkula',component:CenterpageComponent},
// { path: 'haryana/fatehabad/best-cbse-school-fatehabad',component:CenterpageComponent},
// { path: 'haryana/kurukshetra/best-cbse-school-kurukshetra',component:CenterpageComponent},
// { path: 'haryana/rewari/best-cbse-school-rewari',component:CenterpageComponent},
// { path: 'haryana/kaithal/best-cbse-school-kaithal',component:CenterpageComponent},
// { path: 'haryana/tohana/best-cbse-school-tohana',component:CenterpageComponent},
// { path: 'haryana/panipat/best-cbse-school-panipat',component:CenterpageComponent},
// { path: 'punjab/dera-bassi/best-cbse-school-dera-bassi',component:CenterpageComponent},
// { path: 'punjab/ludhiana/best-cbse-school-ludhiana',component:CenterpageComponent},
// { path: 'punjab/moga/best-cbse-school-moga',component:CenterpageComponent},
// { path: 'punjab/rampura/best-cbse-school-rampura',component:CenterpageComponent},
// { path: 'uttar-pradesh/varanasi/best-cbse-school-varanasi',component:CenterpageComponent},
// { path: 'uttar-pradesh/unnao/best-cbse-school-unnao',component:CenterpageComponent},
// { path: 'uttar-pradesh/ghaziabad/best-cbse-school-ghaziabad',component:CenterpageComponent},
// { path: 'uttar-pradesh/saharanpur/best-cbse-school-saharanpur',component:CenterpageComponent},
// { path: 'uttar-pradesh/bijnor/best-cbse-school-bijnor',component:CenterpageComponent},
// { path: 'uttar-pradesh/kasganj/best-cbse-school-kasganj',component:CenterpageComponent},
// { path: 'uttar-pradesh/dadri/best-sbse-school-dadri',component:CenterpageComponent},
// { path: 'uttar-pradesh/meerut/best-cbse-school-meerut',component:CenterpageComponent},
// { path: 'telangana/hyderabad/best-cbse-school-hyderabad-hayathnagar',component:CenterpageComponent},
// { path: 'telangana/seunderabad/best-cbse-school-seunderabad',component:CenterpageComponent},
// { path: 'karnataka/sarjapura/best-cbse-school-sarjapura',component:CenterpageComponent},
// { path: 'karnataka/vidyaranipura/best-cbse-school-vidyaranipura',component:CenterpageComponent},
// { path: 'karnataka/mysore/best-cbse-school-mysore',component:CenterpageComponent},
// { path: 'karnataka/electronic-city/best-cbse-school-electronic-city',component:CenterpageComponent},
// { path: 'karnataka/vijayapura/best-cbse-school-vijayapura',component:CenterpageComponent},
// { path: 'tamil-nadu/madurai/best-cbse-school-madurai',component:CenterpageComponent},
// { path: 'tamil-nadu/salem/best-cbse-school-salem',component:CenterpageComponent},
// { path: 'tamil-nadu/hosur/best-cbse-school-hosur',component:CenterpageComponent},
// { path: 'tamil-nadu/karur/best-cbse-school-karur',component:CenterpageComponent},
// { path: 'tamil-nadu/neyyoor/best-cbse-school-neyyoor',component:CenterpageComponent},
// { path: 'tamil-nadu/nagercoil/best-cbse-school-nagercoil',component:CenterpageComponent},
// { path: 'tamil-nadu/vellore/best-cbse-school-vellore',component:CenterpageComponent},
// { path: 'tamil-nadu/cuddalore/best-cbse-school-cuddalore',component:CenterpageComponent},
// { path: 'tamil-nadu/sivakasi/best-cbse-school-sivakasi',component:CenterpageComponent},
// { path: 'tamil-nadu/trichy/best-cbse-school-trichy',component:CenterpageComponent},
// { path: 'maharashtra/wakad-pune/best-cbse-school-wakad-pune',component:CenterpageComponent},
// { path: 'maharashtra/latur/best-cbse-school-latur',component:CenterpageComponent},
// { path: 'maharashtra/hinjewadi/best-cbse-school-hinjewadi',component:CenterpageComponent},
// { path: 'maharashtra/nanded/best-cbse-school-nanded',component:CenterpageComponent},
// { path: 'madhya-pradesh/indore/best-cbse-school-indore',component:CenterpageComponent},
// { path: 'madhya-pradesh/sagar/best-cbse-school-sagar',component:CenterpageComponent},
// { path: 'madhya-pradesh/rewa/best-cbse-school-rewa',component:CenterpageComponent},
// { path: 'madhya-pradesh/balaghat/best-cbse-school-balaghat-mp',component:CenterpageComponent},



      // { path: 'achievements', component: DiscoverAchievementsComponent },
      { path: 'curriculum', component: CurriculumComponent },
      { path: 'partner-with-us', component: PartnerWithUsComponent },

      {
        path: ':state',
        component: HyperLocalComponentComponent,
        resolve: { validLocation: LocationResolver }
      },
      {
        path: ':state/:city',
        component: HyperLocalComponentComponent,
        resolve: { validLocation: LocationResolver }
      },
      {
        path: ':state/:city/:center',
        component: CenterpageComponent,
        resolve: { validLocation: LocationResolver }
      },

    ],
  },

  { path: 'admission/thankyou', component: AdmissionThankyouComponent },
  { path: 'franchise/thankyou', component: FranchiseThankyouComponent },
  { path: 'page-not-found', component: PagenotfoundComponent },
  { path: '**', pathMatch: 'full', component: PagenotfoundComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
