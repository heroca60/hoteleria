import { TestBed } from '@angular/core/testing';

import { HabitacionservicioService } from './habitacionservicio.service';

describe('HabitacionservicioService', () => {
  let service: HabitacionservicioService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(HabitacionservicioService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
