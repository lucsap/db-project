import { Test, TestingModule } from '@nestjs/testing';
import { LivrosController } from './livros.controller';

describe('LivrosController', () => {
  let controller: LivrosController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [LivrosController],
    }).compile();

    controller = module.get<LivrosController>(LivrosController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
