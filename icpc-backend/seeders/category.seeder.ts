import { DataSource } from 'typeorm';
import { Category } from '../src/categories/entities/category.entity';

export const seedCategories = async (dataSource: DataSource) => {
  const categoryRepository = dataSource.getRepository(Category);

  const categories = [
    { name: 'Números enteros' },
    { name: 'Geometría' },
    { name: 'Ecuaciones' },
    { name: 'Desigualdades' },
  ];

  for (const cat of categories) {
    const category = categoryRepository.create(cat);
    await categoryRepository.save(category);
  }

  console.log('Categorías agregadas correctamente');
};
