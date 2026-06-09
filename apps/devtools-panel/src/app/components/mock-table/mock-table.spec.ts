import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MockTable } from './mock-table';

describe('MockTable', () => {
  let component: MockTable;
  let fixture: ComponentFixture<MockTable>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MockTable],
    }).compileComponents();

    fixture = TestBed.createComponent(MockTable);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
