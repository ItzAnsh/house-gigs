import { Test, TestingModule } from '@nestjs/testing';
import { BookPubController } from './book-pub.controller';

describe('BookPubController', () => {
  let controller: BookPubController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [BookPubController],
    }).compile();

    controller = module.get<BookPubController>(BookPubController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
