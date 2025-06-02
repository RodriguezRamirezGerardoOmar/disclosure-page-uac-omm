import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  UseInterceptors,
  UploadedFile,
  Res
} from '@nestjs/common';
import { ImageService } from './image.service';
import { UpdateImageDto } from './dto/update-image.dto';
import {
  ApiBearerAuth,
  ApiConsumes,
  ApiInternalServerErrorResponse,
  ApiOperation,
  ApiResponse,
  ApiUnauthorizedResponse,
  ApiBody,
  ApiTags
} from '@nestjs/swagger';
import { AuthGuard } from 'src/auth/guard/auth.guard';
import { FileInterceptor } from '@nestjs/platform-express';

/*
Input:
  - uploadFile: file (Express.Multer.File)
  - findAll: none
  - findOne: id (string), res (response object)
  - update: id (string), updateImageDto (fields to update)
  - remove: id (string)
Output:
  - uploadFile: Uploaded image metadata
  - findAll: List of images
  - findOne: Sends the image file as a response
  - update: Updated image
  - remove: Deleted image
Return value: Image controller with endpoints to upload, retrieve, update, and delete images
Function: Handles CRUD operations and file upload for images, with authentication protection for sensitive actions
Variables: imageService
Date: 02 - 06 - 2025
Author: Alan Julian Itzamna Mier Cupul

Endpoints:
- POST /image/upload
  Description: Uploads a new image
  Permission: USER (authentication required)
  Input: file (multipart/form-data)
  Output: Uploaded image metadata

- GET /image
  Description: Retrieves all images
  Permission: Public
  Output: List of images

- GET /image/:id
  Description: Retrieves an image by id (sends file)
  Permission: Public
  Output: Image file

- PATCH /image/:id
  Description: Updates an existing image
  Permission: USER (authentication required)
  Input: updateImageDto
  Output: Updated image

- DELETE /image/:id
  Description: Deletes an existing image
  Permission: USER (authentication required)
  Output: Deleted image
*/

@Controller('image')
@ApiTags('Image')
export class ImageController {
  constructor(private readonly imageService: ImageService) {}

  @Post('upload')
  @UseGuards(AuthGuard)
  @ApiOperation({ summary: 'Upload an image' })
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    description: 'Archivo a subir',
    schema: {
      type: 'object',
      properties: {
        file: {
          type: 'string',
          format: 'binary'
        }
      }
    }
  })
  @UseInterceptors(FileInterceptor('file'))
  async uploadFile(@UploadedFile() file: Express.Multer.File) {
    const image = await this.imageService.create(file);
    return {
      id: image.id,
      assetName: image.assetName
    };
  }

  @Get()
  @ApiResponse({
    description: 'The image list has been successfully retrieved.'
  })
  @ApiUnauthorizedResponse({ description: 'Unauthorized' })
  @ApiInternalServerErrorResponse({ description: 'Internal Server Error' })
  async findAll() {
    return await this.imageService.findAll();
  }

  @Get(':id')
  @ApiResponse({
    description: 'The image has been successfully retrieved.'
  })
  @ApiUnauthorizedResponse({ description: 'Unauthorized' })
  @ApiInternalServerErrorResponse({ description: 'Internal Server Error' })
  async findOne(@Param('id') id: string, @Res() res) {
    const file = await this.imageService.findOne(id);
    res.sendFile(file);
  }

  @Patch(':id')
  @ApiBearerAuth()
  @UseGuards(AuthGuard)
  @ApiResponse({
    description: 'The image has been successfully updated.'
  })
  @ApiUnauthorizedResponse({ description: 'Unauthorized' })
  @ApiInternalServerErrorResponse({ description: 'Internal Server Error' })
  async update(
    @Param('id') id: string,
    @Body() updateImageDto: UpdateImageDto
  ) {
    return await this.imageService.update(id, updateImageDto);
  }

  @Delete(':id')
  @ApiBearerAuth()
  @UseGuards(AuthGuard)
  @ApiResponse({
    description: 'The image has been successfully deleted.'
  })
  @ApiUnauthorizedResponse({ description: 'Unauthorized' })
  @ApiInternalServerErrorResponse({ description: 'Internal Server Error' })
  async remove(@Param('id') id: string) {
    return await this.imageService.remove(id);
  }
}
