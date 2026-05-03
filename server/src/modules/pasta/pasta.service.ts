import {
  BadRequestException,
  Inject,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { Like, Repository } from 'typeorm';
import { Pasta } from './entities/pasta.entity';
import { CreatePastaDto } from './dto/create-pasta.dto';
import { StorageService } from '../../core/storage/storage.service';
import { UpdatePastaDto } from './dto/update-pasta.dto';
import { ApplicationService } from '../applications/application.service';
import { ApplicationLogType } from '../applications/entities/application-log.entity';
import { Request } from 'express';

@Injectable()
export class PastaService {
  constructor(
    @Inject('PASTA_REPOSITORY')
    private readonly pastaRepository: Repository<Pasta>,
    private readonly storageService: StorageService,
    private readonly applicationService: ApplicationService,
  ) {}

  async findByUser(req: Request, query?: string) {
    const findRequest = await this.pastaRepository.findBy({
      owner: { uid: req.user!.uid },
      ...(query ? { keywords: Like(`%${query}%`) } : {}),
    });

    if (req.application) {
      this.applicationService
        .createLog({
          applicationId: req.application.id,
          type: ApplicationLogType.PASTA_QUERY,
          meta: { query, results_count: findRequest.length },
        })
        .catch(() => {});
    }

    return findRequest;
  }

  async create(
    req: Request,
    createPastaDto: CreatePastaDto,
    file?: Express.Multer.File,
  ) {
    if (!createPastaDto.text && !file) {
      throw new BadRequestException('Pasta must have text or a file');
    }

    const storageFile =
      file &&
      (await this.storageService.uploadFile(
        file,
        `${req.user!.uid}-${new Date().getTime()}`,
        file.mimetype,
      ));

    const pasta = this.pastaRepository.create({
      owner: { uid: req.user!.uid },
      keywords: createPastaDto.keywords,
      text: createPastaDto.text,
      ...(file
        ? {
            file: {
              url: storageFile
                ? '/s3/' + storageFile.Bucket + '/' + storageFile.Key
                : undefined,
              mimetype: file?.mimetype,
              size: file?.size,
            },
          }
        : {}),
    });
    const createRequest = await this.pastaRepository.save(pasta);

    if (createRequest?.id && req.application) {
      this.applicationService
        .createLog({
          applicationId: req.application.id,
          type: ApplicationLogType.PASTA_CREATE,
          meta: {
            id: createRequest.id,
            file: createRequest.file,
            text: createRequest.text,
            keywords: createRequest.keywords,
          },
        })
        .catch(() => {});
    }
    return createRequest;
  }

  async update(id: number, req: Request, updatePastaDto: UpdatePastaDto) {
    const pasta = await this.pastaRepository.findOne({
      where: {
        id,
        owner: { uid: req.user!.uid },
      },
    });

    if (!pasta) {
      throw new NotFoundException('Pasta not found');
    }

    const updatedPasta = await this.pastaRepository.save({
      ...pasta,
      ...updatePastaDto,
    });

    if (req.application) {
      this.applicationService
        .createLog({
          applicationId: req.application.id,
          type: ApplicationLogType.PASTA_UPDATE,
          meta: {
            id: id,
            keywords: updatePastaDto.keywords,
            text: updatePastaDto.text,
          },
        })
        .catch(() => {});
    }

    return updatedPasta;
  }

  async remove(id: number, req: Request) {
    const removeRequest = await this.pastaRepository.delete({
      id: id,
      owner: { uid: req.user!.uid },
    });

    if (removeRequest.affected && req.application) {
      this.applicationService
        .createLog({
          applicationId: req.application.id,
          type: ApplicationLogType.PASTA_REMOVE,
          meta: { id },
        })
        .catch(() => {});
    }

    return removeRequest.affected;
  }
}
