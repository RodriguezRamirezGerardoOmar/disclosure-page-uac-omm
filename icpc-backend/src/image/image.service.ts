import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Image } from './entities/image.entity';
import { v4 as uuidv4 } from 'uuid';
import * as fs from 'fs';
import { createHash } from 'crypto';
import { Storage } from '@google-cloud/storage';

/*
Input:
  - create: file (Express.Multer.File)
  - findAll: none
  - findOne: id (string)
  - update: id (string), updateImageDto (Express.Multer.File)
  - remove: id (string)
Output:
  - create: Created or existing image
  - findAll: List of images
  - findOne: Image file from the cloud storage
  - update: Updated image
  - remove: Deleted image
Return value: Service for CRUD operations on images, with file storage and database persistence
Function: Handles business logic for uploading, retrieving, updating, and deleting images, storing files and metadata
Variables: imageRepository
Date: 14 - 08 - 2025
Author: Gerardo Omar Rodriguez Ramirez
*/

@Injectable()
export class ImageService {
  constructor(
    @InjectRepository(Image)
    private readonly imageRepository: Repository<Image>
  ) {}

  /*
  Input: None
  Output: An instance of Storage
  Return value: Storage object
  Function: Creates an instance of Storage to interact with the Google Cloud Storage service
  Variables: projectId, keyFilename, bucketName
  Date: 14 - 08 - 2025
  Author: Gerardo Omar Rodriguez Ramirez
  */

  async getBucket() {
    const bucket = new Storage({
      projectId: 'intrepid-abacus-360419',
      keyFilename: process.env.GOOGLE_DRIVE_CREDENTIALS
    }).bucket(process.env.ASSETS_PATH);
    return bucket;
  }

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
    // Check if an image with the same hash already exists in the database
    const imageInDb = await this.imageRepository.findOneBy({
      hash: image.hash
    });
    if (!imageInDb) {
      // If the image does not exist, save the file and store metadata in the database
      fs.writeFile(
        process.cwd() + '/publicAssets/' + image.assetName,
        file.buffer,
        err => {
          if (err) {
            // If there is an error writing the file, throw the error
            throw err;
          }
        }
      );
      const bucket = await this.getBucket();
      const res = await bucket.upload(
        `${process.cwd()}/publicAssets/${image.assetName}`,
        { destination: image.assetName }
      );
      if (res[0].metadata) {
        fs.rm(
          `${process.cwd()}/publicAssets/${image.assetName}`,
          { recursive: true },
          err => {
            if (err) {
              throw err;
            }
          }
        );
      }
      return await this.imageRepository.save(image);
    } else {
      // If the image already exists, return the existing image metadata
      return imageInDb;
    }
  }

  async findAll() {
    return await this.imageRepository.find();
  }

  async findOne(id: string) {
    const image = await this.imageRepository.findOneBy({ id: id });
    if (image == null) {
      throw new NotFoundException('Imagen no encontrada.');
    }
    const bucket = await this.getBucket();
    const file = await bucket.file(image.assetName).get();
    return {
      mimeType: image.mimeType,
      name: image.assetName,
      data: file[0].createReadStream()
    };
  }

  async update(id: string, updateImageDto: Express.Multer.File) {
    const image = await this.imageRepository.findOneBy({ id: id });
    const hasher = createHash('md5');
    const bucket = await this.getBucket();
    const file = bucket.file(image.assetName);
    const updated = await file.save(updateImageDto.buffer, {
      metadata: {
        contentType: updateImageDto.mimetype
      }
    });
    return await this.imageRepository.save({
      id: id,
      hash: hasher.update(updateImageDto.buffer).digest('hex').toString(),
      mimeType: updateImageDto.mimetype,
      size: updateImageDto.size
    });
  }

  async remove(id: string) {
    const image = await this.imageRepository.findOneBy({ id: id });
    const bucket = await this.getBucket();
    const file = bucket.file(image.assetName);
    const removed = await file.delete();
    console.log(removed);
    return await this.imageRepository.remove(image);
  }
}
