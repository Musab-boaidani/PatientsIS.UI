import { TestBed } from '@angular/core/testing';

import { PatientsAPIService } from './patients-api.service';

describe('PatientsAPIService', () => {
  let service: PatientsAPIService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PatientsAPIService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
