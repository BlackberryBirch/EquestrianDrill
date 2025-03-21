import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FilmstripComponent } from './filmstrip.component';

describe('FilmstripComponent', () => {
  let component: FilmstripComponent;
  let fixture: ComponentFixture<FilmstripComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
    imports: [FilmstripComponent]
})
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FilmstripComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
