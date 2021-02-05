import { TestBed } from '@angular/core/testing';

import { MessagService } from './messag.service';

describe('MessagService', () => {
  let service: MessagService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MessagService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
