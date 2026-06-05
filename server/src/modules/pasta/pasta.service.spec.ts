import { Test, TestingModule } from '@nestjs/testing';
import { ConfigService } from '@nestjs/config';
import { Request } from 'express';
import { PastaService } from './pasta.service';
import { StorageService } from '../../core/storage/storage.service';
import { ApplicationService } from '../applications/application.service';
import {
  NoTextOrFileProvidedException,
  PastaNotFoundException,
} from './pasta.exceptions';

describe('PastaService', () => {
  let pastaService: PastaService;

  const req = {
    user: {
      uid: '1',
    },
  } as unknown as Request;

  const pastaRepositoryMock = {
    findBy: jest.fn(),
    findOne: jest.fn(),
    create: jest.fn(),
    save: jest.fn(),
    delete: jest.fn(),
  };

  const storageServiceMock = {
    uploadFile: jest.fn(),
  };

  const applicationServiceMock = {
    createLog: jest.fn().mockResolvedValue(undefined),
  };

  const configServiceMock = {
    get: jest.fn().mockReturnValue('https://api.test.com'),
  };

  beforeEach(async () => {
    jest.clearAllMocks();

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        PastaService,
        {
          provide: 'PASTA_REPOSITORY',
          useValue: pastaRepositoryMock,
        },
        {
          provide: StorageService,
          useValue: storageServiceMock,
        },
        {
          provide: ApplicationService,
          useValue: applicationServiceMock,
        },
        {
          provide: ConfigService,
          useValue: configServiceMock,
        },
      ],
    }).compile();

    pastaService = module.get(PastaService);
  });

  describe('findByUser', () => {
    it('should return pastas', async () => {
      pastaRepositoryMock.findBy.mockResolvedValue([
        {
          id: 1,
          text: 'hello',
        },
      ]);

      const result = await pastaService.findByUser(req);

      expect(pastaRepositoryMock.findBy).toHaveBeenCalled();
      expect(result).toHaveLength(1);
    });

    it('should search by query', async () => {
      pastaRepositoryMock.findBy.mockResolvedValue([]);

      await pastaService.findByUser(req, 'test');

      expect(pastaRepositoryMock.findBy).toHaveBeenCalledWith(
        expect.objectContaining({
          owner: { uid: '1' },
        }),
      );
    });
  });

  describe('create', () => {
    it('should throw if no data provided', async () => {
      await expect(
        pastaService.create(
          req,
          {
            text: '',
            keywords: '',
          },
          undefined,
        ),
      ).rejects.toThrow(NoTextOrFileProvidedException);
    });

    it('should create text pasta', async () => {
      const pasta = {
        id: 1,
        text: 'hello',
        keywords: 'test',
      };

      pastaRepositoryMock.create.mockReturnValue(pasta);
      pastaRepositoryMock.save.mockResolvedValue(pasta);

      const result = await pastaService.create(req, {
        text: 'hello',
        keywords: 'test',
      });

      expect(pastaRepositoryMock.create).toHaveBeenCalled();
      expect(pastaRepositoryMock.save).toHaveBeenCalled();

      expect(result).toEqual(pasta);
    });

    it('should save pasta with file', async () => {
      storageServiceMock.uploadFile.mockResolvedValue({
        Bucket: 'syncpasta',
        Key: 'file.png',
      });

      pastaRepositoryMock.create.mockImplementation((x) => x);

      pastaRepositoryMock.save.mockResolvedValue({
        id: 1,
        file: {
          url: '/s3/syncpasta/file.png',
          mimetype: 'image/png',
          size: 100,
        },
      });

      const file: Express.Multer.File = {
        mimetype: 'image/png',
        size: 100,
        buffer: Buffer.from('buffer'),
        originalname: 'file.png',
      } as unknown as Express.Multer.File;

      const result = await pastaService.create(
        req,
        {
          keywords: 'file',
        },
        file,
      );

      expect(storageServiceMock.uploadFile).toHaveBeenCalled();

      expect(result.file?.url).toBe(
        'https://api.test.com/s3/syncpasta/file.png',
      );
    });
  });

  describe('update', () => {
    it('should throw if pasta does not exist', async () => {
      pastaRepositoryMock.findOne.mockResolvedValue(null);

      await expect(
        pastaService.update(1, req, {
          text: 'updated',
        }),
      ).rejects.toThrow(PastaNotFoundException);
    });

    it('should update pasta', async () => {
      pastaRepositoryMock.findOne.mockResolvedValue({
        id: 1,
        text: 'old',
      });

      pastaRepositoryMock.save.mockResolvedValue({
        id: 1,
        text: 'updated',
      });

      const result = await pastaService.update(1, req, {
        text: 'updated',
      });

      expect(pastaRepositoryMock.save).toHaveBeenCalled();
      expect(result.text).toBe('updated');
    });
  });

  describe('remove', () => {
    it('should delete pasta', async () => {
      pastaRepositoryMock.delete.mockResolvedValue({
        affected: 1,
      });

      const result = await pastaService.remove(1, req);

      expect(pastaRepositoryMock.delete).toHaveBeenCalledWith({
        id: 1,
        owner: {
          uid: '1',
        },
      });

      expect(result).toBe(1);
    });
  });
});
