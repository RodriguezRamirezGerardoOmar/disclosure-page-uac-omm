/*
Input:
  - create: file (Express.Multer.File)
  - findAll: none
  - findOne: id (string)
  - update: id (string), updateImageDto (fields to update)
  - remove: id (string)
Output:
  - create: Created or existing image
  - findAll: List of images
  - findOne: File path of the image
  - update: Updated image
  - remove: Deleted image
Return value: Service for CRUD operations on images, with file storage and database persistence
Function: Handles business logic for uploading, retrieving, updating, and deleting images, storing files and metadata
Variables: imageRepository
Date: 02 - 06 - 2025
Author: Alan Julian Itzamna Mier Cupul
*/

import { Injectable } from '@nestjs/common';
import { UpdateImageDto } from './dto/update-image.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Image } from './entities/image.entity';
import { v4 as uuidv4 } from 'uuid';
import * as fs from 'fs';
import { createHash } from 'crypto';

@Injectable()
export class ImageService {
  constructor(
    @InjectRepository(Image)
    private readonly imageRepository: Repository<Image>
  ) {}
  async create(file: Express.Multer.File) {
    const uuid = uuidv4();
    const extension = file.originalname.split('.').pop();
    const hasher = createHash('md5');
    const image = this.imageRepository.create({
      assetName: uuid + '.' + extension,
      hash: hasher.update(file.buffer).digest('hex').toString(),
      size: file.size,
      mimeType: file.mimetype
    });
    const imageInDb = await this.imageRepository.findOneBy({
      hash: image.hash
    });
    if (!imageInDb) {
      fs.writeFile(
        process.cwd() + process.env.ASSETS_PATH + '/' + image.assetName,
        file.buffer,
        err => {
          if (err) {
            throw err;
          }
        }
      );
      return await this.imageRepository.save(image);
    } else {
      return imageInDb;
    }
  }

  async findAll() {
    return await this.imageRepository.find();
  }

  async findOne(id: string) {
    const image = await this.imageRepository.findOneBy({ id: id });
    const file =
      process.cwd() + process.env.ASSETS_PATH + '/' + image.assetName;
    return file;
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
