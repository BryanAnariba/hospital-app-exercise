import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateRoleDto } from './dto/create-role.dto';
import { UpdateRoleDto } from './dto/update-role.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Role } from './entities/role.entity';
import { Like, Repository } from 'typeorm';
import { PaginationDto } from 'src/common/dto';

@Injectable()
export class RolesService {
  constructor(
    @InjectRepository(Role)
    private readonly roleRepository: Repository<Role>,
  ) {}

  async create(createRoleDto: CreateRoleDto) {
    try {
      const role = this.roleRepository.create(createRoleDto);
      return await this.roleRepository.save(role);
    } catch (error) {
      if (error instanceof HttpException) throw error;
      if (error.code == 23505) throw new HttpException(`Role duplicate`, HttpStatus.BAD_REQUEST);
      throw new HttpException(
        `Sometime went wrong creating role ${error}`,
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async findAll(paginationDto: PaginationDto) {
    try {
      const [roles, totalRoles] = await Promise.all([
        this.roleRepository.find({
          where: {
            isActive: true,
          },
          /*relations: {
            users: true,
          },*/
          take: paginationDto.take,
          skip: paginationDto.skip * paginationDto.take,
        }),
        this.roleRepository.countBy({
          isActive: true,
        }),
      ]);
      return {
        roles,
        totalRoles,
      };
    } catch (error) {
      if (error instanceof HttpException) throw error;
      throw new HttpException(
        `Sometime went wrong getting all roles: ${error}`,
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async findOne(id: string) {
    try {
      const role = await this.roleRepository.findOne({
        where: {
          id: id,
          isActive: true,
        },/*
        relations: {
          users: true,
        },*/
      });
      if (!role)
        throw new HttpException(`Role not found`, HttpStatus.NOT_FOUND);
      return role;
    } catch (error) {
      if (error instanceof HttpException) throw error;
      throw new HttpException(
        `Sometime went wrong getting role: ${error}`,
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async findOneByName(roleName: string) {
    try {
      const role = await this.roleRepository.findOne({
        where: {
          roleName: Like(roleName.toUpperCase()),
          isActive: true,
        },/*
        relations: {
          users: true,
        },*/
      });
      if (!role)
        throw new HttpException(`Role not found`, HttpStatus.NOT_FOUND);
      return role;
    } catch (error) {
      if (error instanceof HttpException) throw error;
      throw new HttpException(
        `Sometime went wrong getting role: ${error}`,
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async update(id: string, updateRoleDto: UpdateRoleDto) {
    try {
      const role = await this.findOne(id);
      const updatedRole = await this.roleRepository.update(
        { id: id },
        updateRoleDto,
      );
      return {
        beforeRole: role,
        updatedStatus: updatedRole,
      };
    } catch (error) {
      if (error instanceof HttpException) throw error;
      if (error.code == 23505) throw new HttpException(`Role duplicate`, HttpStatus.BAD_REQUEST);
      throw new HttpException(
        `Sometime went wrong updating role: ${error}`,
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async remove(id: string) {
    try {
      const role = await this.findOne(id);
      const updatedRole = await this.roleRepository.update(
        { id: id },
        { isActive: false },
      );
      return {
        beforeRole: role,
        updatedStatus: updatedRole,
      };
    } catch (error) {
      if (error instanceof HttpException) throw error;
      throw new HttpException(
        `Sometime went wrong updating role: ${error}`,
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
