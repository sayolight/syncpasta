import { BadRequestException, Injectable, PipeTransform } from '@nestjs/common';
import { fileTypeFromBuffer } from 'file-type';

interface FileValidationPipeOptions {
  maxSize: number;
  allowedMimeRegex: RegExp;
  allowedSignatures?: string[];
}

@Injectable()
export class FileValidationPipe implements PipeTransform {
  constructor(
    private readonly opts: FileValidationPipeOptions = {
      maxSize: 25 * 1024 * 1024,
      allowedMimeRegex: /^(image\/(png|jpe?g|webp|gif)|video\/(mp4|webm))$/i,
      allowedSignatures: [
        'image/png',
        'image/jpeg',
        'image/webp',
        'image/gif',
        'video/mp4',
        'video/webm',
      ],
    },
  ) {}

  async transform(value: Express.Multer.File) {
    if (!value) return value;

    if (value.size > this.opts.maxSize) {
      throw new BadRequestException('File too large.');
    }

    if (!this.opts.allowedMimeRegex.test(value.mimetype)) {
      throw new BadRequestException('Invalid file type.');
    }

    const magicBytes = await fileTypeFromBuffer(value.buffer);
    if (
      !magicBytes ||
      !this.opts.allowedSignatures?.includes(magicBytes.mime)
    ) {
      throw new BadRequestException(
        'File content does not match its MIME type.',
      );
    }

    return value;
  }
}
