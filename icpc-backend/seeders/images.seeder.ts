import { DataSource } from 'typeorm';
import { Image } from '../src/image/entities/image.entity';

export const seedImages = async (dataSource: DataSource) => {
  const imageRepository = dataSource.getRepository(Image);

  const images = [
    {
      assetName: 'noticia3',
      hash: 'adcb2c2da21d7ffa9cc9de3f781a0f7d',
      mimeType: 'image/jpeg',	
      size: 155408,
    },
  ];

  for (const imageData of images) {
    const existingImage = await imageRepository.findOne({ where: { hash: imageData.hash } });
    if (!existingImage) {
      const image = imageRepository.create(imageData);
      await imageRepository.save(image);
    }
  }

  console.log('Imágenes agregadas correctamente');
};