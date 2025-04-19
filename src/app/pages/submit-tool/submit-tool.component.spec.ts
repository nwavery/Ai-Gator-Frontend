import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SubmitToolComponent } from './submit-tool.component';

describe('SubmitToolComponent', () => {
  let component: SubmitToolComponent;
  let fixture: ComponentFixture<SubmitToolComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SubmitToolComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SubmitToolComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
