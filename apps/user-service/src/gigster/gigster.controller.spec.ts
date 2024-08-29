import { Test, TestingModule } from '@nestjs/testing';
import { GigsterController } from './gigster.controller';

describe('GigsterController', () => {
  let controller: GigsterController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [GigsterController],
    }).compile();

    controller = module.get<GigsterController>(GigsterController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
