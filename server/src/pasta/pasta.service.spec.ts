import { Test, TestingModule } from '@nestjs/testing';
import { PastaService } from './pasta.service';

describe('PastaService', () => {
  let service: PastaService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PastaService],
    }).compile();

    service = module.get<PastaService>(PastaService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
