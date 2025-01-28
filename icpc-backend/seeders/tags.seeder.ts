import { DataSource } from 'typeorm';
import { Tag } from '../src/tags/entities/tag.entity';

export const seedTags = async (dataSource: DataSource) => {
  const tagRepository = dataSource.getRepository(Tag);

  const tags = [
    { name: 'Divisibilidad', color: 'FF5733' },
    { name: 'Congruencias', color: '33FF57' },
    { name: 'Inducción', color: '3357FF' },
    { name: 'Ángulos', color: 'FF33A1' },
    { name: 'Rectas', color: '33FFA1' },
    { name: 'Triángulos', color: 'A133FF' },
    { name: 'Funciones', color: 'FF5734' }, 
    { name: 'Factorización', color: '33FF58' },
    { name: 'Polinomios', color: '3357FE' }, 
  ];

  for (const tagData of tags) {
    const existingTag = await tagRepository.findOne({ where: { name: tagData.name } });
    if (!existingTag) {
      const tag = tagRepository.create(tagData);
      await tagRepository.save(tag);
    }
  }

  console.log('Etiquetas agregadas correctamente');
};