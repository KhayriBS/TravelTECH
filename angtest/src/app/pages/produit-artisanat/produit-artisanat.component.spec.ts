import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProduitArtisanatComponent } from './produit-artisanat.component';

describe('ProduitArtisanatComponent', () => {
  let component: ProduitArtisanatComponent;
  let fixture: ComponentFixture<ProduitArtisanatComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProduitArtisanatComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProduitArtisanatComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
