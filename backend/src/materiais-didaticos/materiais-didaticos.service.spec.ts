import { Test, TestingModule } from '@nestjs/testing';
import { MateriaisDidaticosService } from './materiais-didaticos.service';

describe('MateriaisDidaticosService', () => {
  let service: MateriaisDidaticosService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [MateriaisDidaticosService],
    }).compile();

    service = module.get<MateriaisDidaticosService>(MateriaisDidaticosService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
