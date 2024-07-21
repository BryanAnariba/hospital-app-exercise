import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';
import { PaginationDto } from 'src/common/dto';
import { generateEncryption } from 'src/config';
import { RolesService } from '../roles/roles.service';

@Injectable()
export class UsersService {

  constructor (
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    private readonly rolesService: RolesService,
  ) {}

  async create(createUserDto: CreateUserDto) {
    try {
      const role = await this.rolesService.findOne(createUserDto.role);
      if (!role) throw new HttpException(`Role does not exists.`, HttpStatus.BAD_REQUEST);
      const user = this.userRepository.create({
        ...createUserDto,
        password: generateEncryption(createUserDto.password),
        role: role,
      });
      const saved = await this.userRepository.save(user);
      delete saved.password;
      return saved;
    } catch (error) {
      if (error instanceof HttpException) throw error;
      if (error.code == 23505) throw new HttpException(`User duplicate`, HttpStatus.BAD_REQUEST);
      throw new HttpException(`Sometime went wrong creating user: ${error}`, HttpStatus.INTERNAL_SERVER_ERROR)
    }
  }

  async findAll(paginationDto: PaginationDto) {
    try {
      const [users, totalUsers] = await Promise.all([
        this.userRepository.find({
          where: {
            isActive: true,
          },
          skip: paginationDto.take * paginationDto.skip,
          take: paginationDto.take,
        }),
        this.userRepository.countBy({
          isActive: true,
        }),
      ]);

      return {
        users,
        totalUsers,
      };
    } catch (error) {
      if (error instanceof HttpException) throw error;
      throw new HttpException(`Sometime went wrong getting all users: ${error}`, HttpStatus.INTERNAL_SERVER_ERROR)
    }
  }

  async findOne(id: string) {
    try {
      const user = await this.userRepository.findOne({
        where: {
          id: id,
        }
      });
      if (!user) throw new HttpException(`User not found`, HttpStatus.BAD_REQUEST);
      return user;
    } catch (error) {
      if (error instanceof HttpException) throw error;
      throw new HttpException(`Sometime went wrong getting a users: ${error}`, HttpStatus.INTERNAL_SERVER_ERROR)
    }
  }

  async update(id: string, updateUserDto: UpdateUserDto) {
    try {
      const user = await this.findOne(id);
      const role = await this.rolesService.findOne(updateUserDto.role);
      const userUpdated = await this.userRepository.update(
        {
          id: id
        },
        {
          ...updateUserDto,
          role: role,
        }
      );
      return {
        beforeUser: user,
        afterStatus: userUpdated,
      }
    } catch (error) {
      if (error instanceof HttpException) throw error;
      if (error.code == 23505) throw new HttpException(`User duplicate`, HttpStatus.BAD_REQUEST);
      throw new HttpException(`Sometime went wrong updating user: ${error}`, HttpStatus.INTERNAL_SERVER_ERROR)
    }
  }

  async remove(id: string) {
    try {
      await this.findOne(id);
      const userUpdated = await this.userRepository.update({ id: id }, { isActive: false });
      return userUpdated;
    } catch (error) {
      if (error instanceof HttpException) throw error;
      throw new HttpException(`Sometime went wrong deleting user: ${error}`, HttpStatus.INTERNAL_SERVER_ERROR)
    }
  }
}
