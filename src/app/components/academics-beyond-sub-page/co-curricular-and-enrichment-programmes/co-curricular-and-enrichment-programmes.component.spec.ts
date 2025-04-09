import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CoCurricularAndEnrichmentProgrammesComponent } from './co-curricular-and-enrichment-programmes.component';

describe('CoCurricularAndEnrichmentProgrammesComponent', () => {
  let component: CoCurricularAndEnrichmentProgrammesComponent;
  let fixture: ComponentFixture<CoCurricularAndEnrichmentProgrammesComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CoCurricularAndEnrichmentProgrammesComponent]
    });
    fixture = TestBed.createComponent(CoCurricularAndEnrichmentProgrammesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
