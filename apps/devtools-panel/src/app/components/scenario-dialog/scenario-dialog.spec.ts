import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ScenarioDialog } from './scenario-dialog';

describe('ScenarioDialog', () => {
  let component: ScenarioDialog;
  let fixture: ComponentFixture<ScenarioDialog>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ScenarioDialog],
    }).compileComponents();

    fixture = TestBed.createComponent(ScenarioDialog);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
