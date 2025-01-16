import { DataSource } from 'typeorm';
import { Comment } from '../src/comment/entities/comment.entity';

export const seedComments = async (dataSource: DataSource) => {
  const commentRepository = dataSource.getRepository(Comment);

  const comments = [
    { body: 'Números enteros' },
    { body: 'Geometría' },
    { body: 'Ecuaciones' },
    { body: 'Desigualdades' },
  ];

  for (const commentData of comments) {
    const existingComment = await commentRepository.findOne({ where: { body: commentData.body } });
    if (!existingComment) {
      const comment = commentRepository.create(commentData);
      await commentRepository.save(comment);
    }
  }
};