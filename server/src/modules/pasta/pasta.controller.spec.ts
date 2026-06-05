import { Test, TestingModule } from '@nestjs/testing';
import { PastaController } from './pasta.controller';
import { PastaService } from './pasta.service';
import { AnyAuthGuard } from '../auth/any-auth.guard';

jest.mock('../../core/storage/file-validation.pipe', () => ({
  FileValidationPipe: jest.fn().mockImplementation(() => ({
    transform: jest.fn(),
  })),
}));

describe('PastaController', () => {
  let pastaController: PastaController;
  let pastaService: jest.Mocked<PastaService>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PastaController],
      providers: [
        {
          provide: PastaService,
          useValue: {
            findByUser: jest.fn(),
            create: jest.fn(),
            update: jest.fn(),
            remove: jest.fn(),
          },
        },
      ],
    })
      .overrideGuard(AnyAuthGuard)
      .useValue({
        canActivate: jest.fn(() => true),
      })
      .compile();

    pastaController = module.get(PastaController);
    pastaService = module.get(PastaService);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('findByUser', () => {
    it('should call pastaService.findByUser', async () => {
      const req: any = {
        user: { uid: '1' },
      };

      pastaService.findByUser.mockResolvedValue([]);

      await pastaController.findByUser(req, 'keyword');

      expect(pastaService.findByUser).toHaveBeenCalledWith(req, 'keyword');
    });
  });

  describe('create', () => {
    it('should call pastaService.create', async () => {
      const req: any = {
        user: { uid: '1' },
      };

      const dto = {
        text: 'hello world',
        keywords: 'keyword world',
      };

      const file: any = {
        mimetype: 'image/png',
      };

      pastaService.create.mockResolvedValue({ id: 1 } as any);

      await pastaController.create(req, dto, file);

      expect(pastaService.create).toHaveBeenCalledWith(req, dto, file);
    });
  });

  describe('edit', () => {
    it('should call pastaService.update', async () => {
      const req: any = {
        user: { uid: '123' },
      };

      const dto = {
        text: 'updated',
      };

      pastaService.update.mockResolvedValue({ id: 1 } as any);

      await pastaController.edit('1', req, dto);

      expect(pastaService.update).toHaveBeenCalledWith(1, req, dto);
    });
  });

  describe('remove', () => {
    it('should call pastaService.remove', async () => {
      const req: any = {
        user: { uid: '1' },
      };

      pastaService.remove.mockResolvedValue(1);

      await pastaController.remove(req, '1');

      expect(pastaService.remove).toHaveBeenCalledWith(1, req);
    });
  });
});
