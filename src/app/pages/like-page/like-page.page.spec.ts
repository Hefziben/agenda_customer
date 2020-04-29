import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { LikePagePage } from './like-page.page';

describe('LikePagePage', () => {
  let component: LikePagePage;
  let fixture: ComponentFixture<LikePagePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LikePagePage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(LikePagePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
