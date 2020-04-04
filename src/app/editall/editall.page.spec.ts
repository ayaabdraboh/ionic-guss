import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { EditallPage } from './editall.page';

describe('EditallPage', () => {
  let component: EditallPage;
  let fixture: ComponentFixture<EditallPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditallPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(EditallPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
