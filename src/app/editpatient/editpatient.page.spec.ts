import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { EditpatientPage } from './editpatient.page';

describe('EditpatientPage', () => {
  let component: EditpatientPage;
  let fixture: ComponentFixture<EditpatientPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditpatientPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(EditpatientPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
