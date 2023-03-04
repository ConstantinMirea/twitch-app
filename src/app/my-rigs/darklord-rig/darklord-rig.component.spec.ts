import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DarklordRigComponent } from './darklord-rig.component';

describe('DarklordRigComponent', () => {
  let component: DarklordRigComponent;
  let fixture: ComponentFixture<DarklordRigComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DarklordRigComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DarklordRigComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
