import { ApiProperty } from '@nestjs/swagger';

/*
Input: file (Express.Multer.File)
Output: DTO object with the necessary data to upload an image
Return value: DTO for image upload
Function: Receives the file data to upload a new image to the system
Variables: file
Date: 02 - 06 - 2025
Author: Alan Julian Itzamna Mier Cupul
*/

export class CreateImageDto {
  @ApiProperty()
  file: Express.Multer.File;
}
