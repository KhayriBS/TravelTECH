import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CeramiqueetpoterieComponent } from './ceramiqueetpoterie.component';

describe('CeramiqueetpoterieComponent', () => {
  let component: CeramiqueetpoterieComponent;
  let fixture: ComponentFixture<CeramiqueetpoterieComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CeramiqueetpoterieComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CeramiqueetpoterieComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
