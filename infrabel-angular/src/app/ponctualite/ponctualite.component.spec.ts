import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PonctualiteComponent } from './ponctualite.component';

describe('PonctualiteComponent', () => {
  let component: PonctualiteComponent;
  let fixture: ComponentFixture<PonctualiteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PonctualiteComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PonctualiteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
