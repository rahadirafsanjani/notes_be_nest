import { HttpException, Injectable } from '@nestjs/common';
import { CreateUsersDto } from './dto/create-user.dto';
import { UpdateUsersDto } from './dto/update-users.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Users } from './entities/users.entity';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(Users)
    private readonly usersRepository: Repository<Users>,
  ) {}

  async create(createUsersDto: CreateUsersDto): Promise<Users> {
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(
      createUsersDto.password,
      saltRounds,
    );

    const user = this.usersRepository.create({
      ...createUsersDto,
      password: hashedPassword,
    });

    return this.usersRepository.save(user);
  }

  async findAll(): Promise<Users[]> {
    return await this.usersRepository.find();
  }

  async findOneByEmail(email: string): Promise<Users> {
    const userData = await this.usersRepository.findOneBy({ email });
    if (!userData) {
      throw new HttpException('User Not Found', 404);
    }
    return userData;
  }

  async findOneById(id: number): Promise<Users> {
    const userData = await this.usersRepository.findOneBy({ id });
    if (!userData) {
      throw new HttpException('User Not Found', 404);
    }
    return userData;
  }

  async update(id: number, updateUsersDto: UpdateUsersDto): Promise<Users> {
    const existingUser = await this.findOneById(id);
    const userData = this.usersRepository.merge(existingUser, updateUsersDto);
    return await this.usersRepository.save(userData);
  }

  async remove(id: number): Promise<Users> {
    const existingUser = await this.findOneById(id);
    return await this.usersRepository.remove(existingUser);
  }
}
