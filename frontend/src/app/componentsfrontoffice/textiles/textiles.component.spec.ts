import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TextilesComponent } from './textiles.component';

describe('TextilesComponent', () => {
  let component: TextilesComponent;
  let fixture: ComponentFixture<TextilesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TextilesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TextilesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
