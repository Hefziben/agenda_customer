import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { PostStatusPage } from './post-status.page';

describe('PostStatusPage', () => {
  let component: PostStatusPage;
  let fixture: ComponentFixture<PostStatusPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PostStatusPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(PostStatusPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
