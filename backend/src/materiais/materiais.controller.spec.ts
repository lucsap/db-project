import { Test, TestingModule } from '@nestjs/testing';
import { MateriaisController } from './materiais.controller';

describe('MateriaisController', () => {
  let controller: MateriaisController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [MateriaisController],
    }).compile();

    controller = module.get<MateriaisController>(MateriaisController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
