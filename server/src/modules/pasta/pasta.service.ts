import { BadRequestException, Inject, Injectable } from '@nestjs/common';
import { Like, Repository } from 'typeorm';
import { Pasta } from './entities/pasta.entity';
import { CreatePastaDto } from './dto/create-pasta.dto';
// import * as firebaseAdmin from 'firebase-admin';
import { StorageService } from '../../core/storage/storage.service';
import { ConfigService } from '@nestjs/config/dist/config.service';

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
    pastaFile?: Express.Multer.File,
  ) {
    if (!createPastaDto.text && !pastaFile) {
      throw new BadRequestException('Pasta must have text or a file');
    }

    const storageFile =
      pastaFile &&
      (await this.storageService.uploadFile(
        pastaFile,
        `${uid}-${new Date().getTime()}`,
        pastaFile.mimetype,
      ));

    const pasta = this.pastaRepository.create({
      owner: { uid },
      keywords: createPastaDto.keywords,
      fileUrl: storageFile
        ? this.configService.get<string>('S3_PUBLIC_URL') +
          '/' +
          storageFile.Bucket +
          '/' +
          storageFile.Key
        : undefined,
      text: createPastaDto.text,
    });
    return await this.pastaRepository.save(pasta);
  }
}
