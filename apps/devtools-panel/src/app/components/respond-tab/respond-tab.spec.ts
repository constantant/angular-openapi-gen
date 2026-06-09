import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RespondTab } from './respond-tab';

describe('RespondTab', () => {
  let component: RespondTab;
  let fixture: ComponentFixture<RespondTab>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RespondTab],
    }).compileComponents();

    fixture = TestBed.createComponent(RespondTab);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
