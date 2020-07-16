import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ZoneDashboardComponent } from './zone-dashboard.component';

describe('ZoneDashboardComponent', () => {
  let component: ZoneDashboardComponent;
  let fixture: ComponentFixture<ZoneDashboardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ZoneDashboardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ZoneDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
