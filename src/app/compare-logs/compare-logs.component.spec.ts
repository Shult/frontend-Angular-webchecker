import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CompareLogsComponent } from './compare-logs.component';

describe('CompareLogsComponent', () => {
  let component: CompareLogsComponent;
  let fixture: ComponentFixture<CompareLogsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CompareLogsComponent]
    });
    fixture = TestBed.createComponent(CompareLogsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
