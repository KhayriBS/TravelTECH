import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BoisComponent } from './bois.component';

describe('BoisComponent', () => {
  let component: BoisComponent;
  let fixture: ComponentFixture<BoisComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BoisComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BoisComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
