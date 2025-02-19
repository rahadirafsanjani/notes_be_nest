import { HttpException, Injectable } from '@nestjs/common';
import { CreateUsersDto } from './dto/create-users.dto';
import { UpdateUsersDto } from './dto/update-users.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Users } from './entities/users.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(Users)
    private readonly userRepository: Repository<Users>,
  ) {}

  async create(createUsersDto: CreateUsersDto): Promise<Users> {
    const userData = this.userRepository.create(createUsersDto);
    return this.userRepository.save(userData);
  }

  async findAll(): Promise<Users[]> {
    return await this.userRepository.find();
  }

  async findOne(id: number): Promise<Users> {
    const userData = await this.userRepository.findOneBy({ id });
    if (!userData) {
      throw new HttpException('User Not Found', 404);
    }
    return userData;
  }

  async update(id: number, updateUsersDto: UpdateUsersDto): Promise<Users> {
    const existingUser = await this.findOne(id);
    const userData = this.userRepository.merge(existingUser, updateUsersDto);
    return await this.userRepository.save(userData);
  }

  async remove(id: number): Promise<Users> {
    const existingUser = await this.findOne(id);
    return await this.userRepository.remove(existingUser);
  }
}
