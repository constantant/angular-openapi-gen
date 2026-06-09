import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HistoryTab } from './history-tab';

describe('HistoryTab', () => {
  let component: HistoryTab;
  let fixture: ComponentFixture<HistoryTab>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HistoryTab],
    }).compileComponents();

    fixture = TestBed.createComponent(HistoryTab);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
