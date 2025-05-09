import 'reflect-metadata';
import { seedCategories } from './seeders/category.seeder';
import { seedComments } from './seeders/comment.seeder';
import { seedDifficulty } from './seeders/difficulty.seeder';
import { seedRole } from './seeders/roles.seeder';
import { seedUser } from './seeders/users.seeder';
import { seedTags } from './seeders/tags.seeder';
import { seedImages } from './seeders/images.seeder';


import { AppDataSourceForSeed } from './data-source'; // Cambiado a el nuevo DataSource para la semilla

const runSeed = async () => {
  const dataSource = await AppDataSourceForSeed.initialize();

  try {
    console.log('Iniciando la semilla...');
    await seedCategories(dataSource);
    await seedComments(dataSource);
    await seedDifficulty(dataSource);
    await seedRole(dataSource);
    await seedUser(dataSource);
    await seedTags(dataSource);
    await seedImages(dataSource);
    console.log('Seeding completado exitosamente.');
  } catch (error) {
    console.error('Error al correr las semillas:', error);
  } finally {
    await dataSource.destroy();
  }
};

runSeed();
