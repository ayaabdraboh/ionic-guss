import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { FlitterPage } from './flitter.page';

describe('FlitterPage', () => {
  let component: FlitterPage;
  let fixture: ComponentFixture<FlitterPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FlitterPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(FlitterPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
