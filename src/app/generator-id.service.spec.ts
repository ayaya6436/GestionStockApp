import { TestBed } from '@angular/core/testing';

import { GeneratorIdService } from './generator-id.service';

describe('GeneratorIdService', () => {
  let service: GeneratorIdService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GeneratorIdService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
