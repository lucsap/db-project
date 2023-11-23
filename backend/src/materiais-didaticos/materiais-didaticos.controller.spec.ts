import { Test, TestingModule } from '@nestjs/testing';
import { MateriaisDidaticosController } from './materiais-didaticos.controller';

describe('MateriaisDidaticosController', () => {
  let controller: MateriaisDidaticosController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [MateriaisDidaticosController],
    }).compile();

    controller = module.get<MateriaisDidaticosController>(MateriaisDidaticosController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
