import { Inject, Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { Pasta } from './entities/pasta.entity';
import { CreatePastaDto } from './dto/create-pasta.dto';
import * as firebaseAdmin from 'firebase-admin';
import { StorageService } from '../storage/storage.service';

@Injectable()
export class PastaService {
  constructor(
    @Inject('PASTA_REPOSITORY') private pastaRepository: Repository<Pasta>,
    @Inject('FIREBASE_ADMIN') private firebase: firebaseAdmin.app.App,
    private storageService: StorageService,
  ) {}

  async findByUser(uid: string, query?: string) {
    return await this.pastaRepository.findBy({
      owner: { uid },
      ...(query ? { description: query } : {}),
    });
  }

  async create(
    uid: string,
    createPastaDto: CreatePastaDto,
    pastaFile: Express.Multer.File,
  ) {
    const storageFile = await this.storageService.uploadFile(
      pastaFile,
      `${uid}-${new Date().getTime()}.png`,
      'image/png',
    );
    console.log(storageFile);

    const pasta = this.pastaRepository.create({
      owner: { uid },
      description: createPastaDto.description,
      fileUrl: storageFile.Location,
    });
    return await this.pastaRepository.save(pasta);
  }
}
