import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BijouterieComponent } from './bijouterie.component';

describe('BijouterieComponent', () => {
  let component: BijouterieComponent;
  let fixture: ComponentFixture<BijouterieComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BijouterieComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BijouterieComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
