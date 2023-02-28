import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GamesStreamedComponent } from './games-streamed.component';

describe('GamesStreamedComponent', () => {
  let component: GamesStreamedComponent;
  let fixture: ComponentFixture<GamesStreamedComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GamesStreamedComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GamesStreamedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
