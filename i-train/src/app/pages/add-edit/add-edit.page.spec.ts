import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { AddEditPage } from './add-edit.page';

describe('AddEditPage', () => {
  let component: AddEditPage;
  let fixture: ComponentFixture<AddEditPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddEditPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(AddEditPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
