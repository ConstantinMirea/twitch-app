import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TwitchPageComponent } from './twitch-page.component';

describe('TwitchPageComponent', () => {
  let component: TwitchPageComponent;
  let fixture: ComponentFixture<TwitchPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TwitchPageComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TwitchPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
