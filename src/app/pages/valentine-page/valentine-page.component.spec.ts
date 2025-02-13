import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ValentinePageComponent } from './valentine-page.component';

describe('ValentinePageComponent', () => {
  let component: ValentinePageComponent;
  let fixture: ComponentFixture<ValentinePageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ValentinePageComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ValentinePageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
