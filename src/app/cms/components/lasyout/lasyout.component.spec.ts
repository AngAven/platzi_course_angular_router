import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LasyoutComponent } from './lasyout.component';

describe('LasyoutComponent', () => {
  let component: LasyoutComponent;
  let fixture: ComponentFixture<LasyoutComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LasyoutComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LasyoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
