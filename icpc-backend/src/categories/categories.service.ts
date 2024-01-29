import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Category } from './entities/category.entity';

@Injectable()
export class CategoriesService {
  constructor(
    @InjectRepository(Category)
    private readonly categoryRepository: Repository<Category>
  ) {}
  async create(createCategoryDto: CreateCategoryDto) {
    const name = await this.findOneByName(createCategoryDto.name); // check if name exists
    if (name !== null) {
      throw new BadRequestException('Category already exists');
    }
    const newCategory = this.categoryRepository.create(createCategoryDto);
    const category = await this.categoryRepository.save(newCategory);
    return {
      id: category.id,
      name: category.name
    };
  }

  async findAll() {
    return await this.categoryRepository.find();
  }

  async findOne(id: string) {
    return await this.categoryRepository.findOneBy({ id });
  }

  async findOneByName(name: string) {
    if (!name) {
      return null; // return null if name is not provided
    }
    const category = await this.categoryRepository // find the category in the 'category' table by the name
      .createQueryBuilder('category')
      .leftJoinAndSelect('commentId', 'comment') // join the 'categories' table to the 'comments' table
      .where('category.name = :name', { name }) // find the category by name
      .getMany();
    if (category.length === 0) {
      return null; // return null if category doesn't exist
    }
    return category[0]; // return the category object
  }

  async update(id: string, updateCategoryDto: UpdateCategoryDto) {
    const category = await this.findOne(id);
    return await this.categoryRepository.update(category, updateCategoryDto);
  }

  async remove(id: string) {
    const category = await this.findOne(id);
    return await this.categoryRepository.remove(category);
  }
}
