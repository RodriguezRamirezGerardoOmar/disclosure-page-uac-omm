import { Injectable } from '@nestjs/common';
import { UpdateImageDto } from './dto/update-image.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Image } from './entities/image.entity';

@Injectable()
export class ImageService {
  constructor(
    @InjectRepository(Image)
    private readonly imageRepository: Repository<Image>
  ) {}
  async create(file: Express.Multer.File) {
    console.log(file);
    const image = this.imageRepository.create({
      assetName: file.originalname,
      data: file.buffer,
      mimeType: file.mimetype
    });
    const imageInDb = await this.imageRepository.findOneBy({
      data: file.buffer
    });
    if (!imageInDb) {
      return await this.imageRepository.save(image);
    } else {
      return imageInDb;
    }
  }

  async findAll() {
    return await this.imageRepository.find();
  }

  async findOne(id: string) {
    return await this.imageRepository.findOneBy({ id: id });
  }

  async update(id: string, updateImageDto: UpdateImageDto) {
    const image = await this.imageRepository.findOneBy({ id: id });
    return await this.imageRepository.save({ ...image, ...updateImageDto });
  }

  async remove(id: string) {
    const image = await this.imageRepository.findOneBy({ id: id });
    return await this.imageRepository.remove(image);
  }
}
