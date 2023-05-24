import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MorpheusRigComponent } from './morpheus-rig.component';

describe('MorpheusRigComponent', () => {
  let component: MorpheusRigComponent;
  let fixture: ComponentFixture<MorpheusRigComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MorpheusRigComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MorpheusRigComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
