import { Test, TestingModule } from '@nestjs/testing';
import { BookPubService } from './book-pub.service';

describe('BookPubService', () => {
  let service: BookPubService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [BookPubService],
    }).compile();

    service = module.get<BookPubService>(BookPubService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
