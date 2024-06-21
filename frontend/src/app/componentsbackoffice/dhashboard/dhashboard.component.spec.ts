import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DhashboardComponent } from './dhashboard.component';

describe('DhashboardComponent', () => {
  let component: DhashboardComponent;
  let fixture: ComponentFixture<DhashboardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DhashboardComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DhashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
