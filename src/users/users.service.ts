import { HttpException, Injectable } from '@nestjs/common';
import { CreateUsersDto } from './dto/create-users.dto';
import { UpdateUsersDto } from './dto/update-users.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Users } from './entities/users.entity';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(Users)
    private readonly userRepository: Repository<Users>,
  ) {}

  // Function to decrypt
  // async validateUser(email: string, password: string): Promise<User | null> {
  //   const user = await this.userRepository.findOne({ where: { email } });
  //   if (user && (await bcrypt.compare(password, user.password))) {
  //     return user; // Passwords match
  //   }
  //   return null; // Passwords do not match
  // }

  async create(createUsersDto: CreateUsersDto): Promise<Users> {
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(
      createUsersDto.password,
      saltRounds,
    );

    const user = this.userRepository.create({
      ...createUsersDto,
      password: hashedPassword,
    });

    return this.userRepository.save(user);
  }

  async findAll(): Promise<Users[]> {
    return await this.userRepository.find();
  }

  async findOneByEmail(email: string): Promise<Users> {
    const userData = await this.userRepository.findOneBy({ email });
    if (!userData) {
      throw new HttpException('User Not Found', 404);
    }
    return userData;
  }

  async findOneById(id: number): Promise<Users> {
    const userData = await this.userRepository.findOneBy({ id });
    if (!userData) {
      throw new HttpException('User Not Found', 404);
    }
    return userData;
  }

  async update(id: number, updateUsersDto: UpdateUsersDto): Promise<Users> {
    const existingUser = await this.findOneById(id);
    const userData = this.userRepository.merge(existingUser, updateUsersDto);
    return await this.userRepository.save(userData);
  }

  async remove(id: number): Promise<Users> {
    const existingUser = await this.findOneById(id);
    return await this.userRepository.remove(existingUser);
  }
}
