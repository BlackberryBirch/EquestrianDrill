import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RiderlistComponent } from './riderlist.component';

describe('RiderlistComponent', () => {
  let component: RiderlistComponent;
  let fixture: ComponentFixture<RiderlistComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RiderlistComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RiderlistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
