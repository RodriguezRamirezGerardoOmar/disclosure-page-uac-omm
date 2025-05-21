import { DataSource } from 'typeorm';
import { Difficulty } from '../src/difficulty/entities/difficulty.entity';

export const seedDifficulty = async (dataSource: DataSource) => {
  const difficultyRepository = dataSource.getRepository(Difficulty);

  const difficulties = [
    { level: 1, name: 'Nivel Uno' },
    { level: 2, name: 'Nivel Dos' },
    { level: 3, name: 'Nivel Tres' }
  ];

  for (const diff of difficulties) {
    const difficulty = difficultyRepository.create(diff);
    await difficultyRepository.save(difficulty);
  }

  console.log('Dificultades agregadas correctamente');
};
