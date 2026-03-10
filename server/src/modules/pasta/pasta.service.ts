import { BadRequestException, Inject, Injectable } from '@nestjs/common';
import { Like, Repository } from 'typeorm';
import { Pasta } from './entities/pasta.entity';
import { CreatePastaDto } from './dto/create-pasta.dto';
// import * as firebaseAdmin from 'firebase-admin';
import { StorageService } from '../../core/storage/storage.service';
import { ConfigService } from '@nestjs/config/dist/config.service';
import { UpdatePastaDto } from './dto/update-pasta.dto';

@Injectable()
export class PastaService {
  constructor(
    @Inject('PASTA_REPOSITORY') private pastaRepository: Repository<Pasta>,
    // @Inject('FIREBASE_ADMIN') private firebase: firebaseAdmin.app.App,
    private storageService: StorageService,
    private configService: ConfigService,
  ) {}

  async findByUser(uid: string, query?: string) {
    return await this.pastaRepository.findBy({
      owner: { uid },
      ...(query ? { keywords: Like(`%${query}%`) } : {}),
    });
  }

  async create(
    uid: string,
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
        `${uid}-${new Date().getTime()}`,
        file.mimetype,
      ));

    const pasta = this.pastaRepository.create({
      owner: { uid },
      keywords: createPastaDto.keywords,
      text: createPastaDto.text,
      ...(file
        ? {
            file: {
              url: storageFile
                ? this.configService.get<string>('S3_PUBLIC_URL') +
                  '/' +
                  storageFile.Bucket +
                  '/' +
                  storageFile.Key
                : undefined,
              mimetype: file?.mimetype,
              size: file?.size,
            },
          }
        : {}),
    });
    return await this.pastaRepository.save(pasta);
  }

  async update(id: number, uid: string, updatePastaDto: UpdatePastaDto) {
    return await this.pastaRepository.update(
      {
        id: id,
        owner: { uid },
      },
      updatePastaDto,
    );
  }

  async remove(id: number, uid: string) {
    return await this.pastaRepository.delete({
      id: id,
      owner: { uid },
    });
  }
}
