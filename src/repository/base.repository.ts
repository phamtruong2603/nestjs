import { Repository, DeepPartial, FindManyOptions } from 'typeorm';

export class BaseRepository<T> {
  constructor(private readonly repository: Repository<T>) {}

  async create(data: DeepPartial<T>): Promise<T> {
    const createdEntity = this.repository.create(data);
    return await this.repository.save(createdEntity);
  }

  async findOne(options: FindManyOptions<T>): Promise<T | undefined> {
    return this.repository.findOne(options);
  }

  async findMany(options: FindManyOptions<T>): Promise<T[]> {
    return this.repository.find(options);
  }

  async findAll(options: FindManyOptions<T>): Promise<T[]> {
    return this.repository.find(options);
  }

  async update(updateData: DeepPartial<T>): Promise<T | undefined> {
    return await this.repository.save(updateData);
  }

  async delete(id: string): Promise<boolean> {
    const result = await this.repository.delete(id);
    return result.affected !== undefined && result.affected > 0;
  }
}
