import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { ProvideListPage } from './provide-list.page';

describe('ProvideListPage', () => {
  let component: ProvideListPage;
  let fixture: ComponentFixture<ProvideListPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProvideListPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(ProvideListPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
