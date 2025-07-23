import { Test, TestingModule } from '@nestjs/testing';
import { PastaController } from './pasta.controller';
import { PastaService } from './pasta.service';

describe('PastaController', () => {
  let controller: PastaController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PastaController],
      providers: [PastaService],
    }).compile();

    controller = module.get<PastaController>(PastaController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
