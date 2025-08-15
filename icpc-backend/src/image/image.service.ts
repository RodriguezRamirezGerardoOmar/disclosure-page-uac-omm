import { Injectable } from '@nestjs/common';
import { UpdateImageDto } from './dto/update-image.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Image } from './entities/image.entity';
import { v4 as uuidv4 } from 'uuid';
import * as fs from 'fs';
import { createHash } from 'crypto';
import google, { Auth, drive_v3 } from 'googleapis';

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

@Injectable()
export class ImageService {
  constructor(
    @InjectRepository(Image)
    private readonly imageRepository: Repository<Image>
  ) {}

  async authorize() {
    const keyData = fs.readFileSync(process.env.GOOGLE_DRIVE_CREDENTIALS);
    const key = JSON.parse(keyData.toString());
    const jwtClient = new Auth.JWT({
      email: key.client_email,
      key: key.private_key,
      scopes: ['https://www.googleapis.com/auth/drive']
    });
    await jwtClient.authorize();
    return jwtClient;
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
      /*fs.writeFile(
        process.cwd() + process.env.ASSETS_PATH + '/' + image.assetName,
        file.buffer,
        err => {
          if (err) {
            // If there is an error writing the file, throw the error
            throw err;
          }
        }
      );*/
      const auth = await this.authorize();

      const drive = new drive_v3.Drive({
        auth: auth
      });

      const res = drive.files.create(
        {
          auth: auth,

          requestBody: {
            name: image.assetName,

            parents: [process.env.ASSETS_PATH],

            mimeType: file.mimetype
          },

          media: {
            mimeType: file.mimetype,

            body: file.buffer
          },

          fields: 'id'
        },

        function (err) {
          if (err) {
            throw err;
          }
        }
      );
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
    const auth = await this.authorize();
    const drive = new drive_v3.Drive({
      auth: auth
    });

    const res = await drive.files.list({
      q: `'${process.env.ASSETS_PATH}' in parents and name='${image.assetName}'`,

      fields: 'files(id, name)'
    });

    const file = await drive.files.get(
      {
        fileId: res.data.files[0].id,

        alt: 'media'
      },

      {
        responseType: 'stream'
      }
    );

    return { mimeType: image.mimeType, name: image.assetName, data: file.data };
  }

  async update(id: string, updateImageDto: UpdateImageDto) {
    const image = await this.imageRepository.findOneBy({ id: id });
    const auth = await this.authorize();

    const drive = new drive_v3.Drive({
      auth: auth
    });

    const res = await drive.files.list({
      q: `'${process.env.ASSETS_PATH}' in parents and name='${image.assetName}'`,

      fields: 'files(id)'
    });

    const driveId = res.data.files[0].id;

    await drive.files.update({
      fileId: driveId,

      auth: auth,

      requestBody: {
        mimeType: updateImageDto.file.mimetype ?? image.mimeType
      },

      media: {
        mimeType: updateImageDto.file?.mimetype ?? image.mimeType,

        body: updateImageDto.file ? updateImageDto.file.buffer : null
      }
    });
    return await this.imageRepository.save({ ...image, ...updateImageDto });
  }

  async remove(id: string) {
    const image = await this.imageRepository.findOneBy({ id: id });

    const auth = await this.authorize();

    const drive = new drive_v3.Drive({
      auth: auth
    });

    const res = await drive.files.list({
      q: `'${process.env.ASSETS_PATH}' in parents and name='${image.assetName}'`,

      fields: 'files(id)'
    });

    const driveId = res.data.files[0].id;

    await drive.files.delete({
      fileId: driveId,

      auth: auth
    });
    return await this.imageRepository.remove(image);
  }
}
