import { Test, TestingModule } from '@nestjs/testing';
import { MateriaisService } from './materiais.service';

describe('MateriaisService', () => {
  let service: MateriaisService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [MateriaisService],
    }).compile();

    service = module.get<MateriaisService>(MateriaisService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
