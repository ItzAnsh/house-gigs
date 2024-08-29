import { Test, TestingModule } from '@nestjs/testing';
import { GigsterService } from './gigster.service';

describe('GigsterService', () => {
  let service: GigsterService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [GigsterService],
    }).compile();

    service = module.get<GigsterService>(GigsterService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
