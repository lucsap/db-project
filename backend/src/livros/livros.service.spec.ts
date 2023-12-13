import { Test, TestingModule } from '@nestjs/testing';
import { LivrosService } from './livros.service';

describe('LivrosService', () => {
  let service: LivrosService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [LivrosService],
    }).compile();

    service = module.get<LivrosService>(LivrosService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
