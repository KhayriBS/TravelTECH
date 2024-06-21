import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BlogArticleGuideComponent } from './blog-article-guide.component';

describe('BlogArticleGuideComponent', () => {
  let component: BlogArticleGuideComponent;
  let fixture: ComponentFixture<BlogArticleGuideComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BlogArticleGuideComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BlogArticleGuideComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
