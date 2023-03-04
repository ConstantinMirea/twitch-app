import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Ps5RigComponent } from './ps5-rig.component';

describe('Ps5RigComponent', () => {
  let component: Ps5RigComponent;
  let fixture: ComponentFixture<Ps5RigComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ Ps5RigComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Ps5RigComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
