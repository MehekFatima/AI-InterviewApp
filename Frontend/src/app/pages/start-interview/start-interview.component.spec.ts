import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StartInterviewComponent } from './start-interview.component';

describe('StartInterviewComponent', () => {
  let component: StartInterviewComponent;
  let fixture: ComponentFixture<StartInterviewComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [StartInterviewComponent]
    });
    fixture = TestBed.createComponent(StartInterviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
