import { Controller, Get, Post, Body, Patch, Param, Delete, ParseUUIDPipe, Query } from '@nestjs/common';
import { RolesService } from './roles.service';
import { CreateRoleDto } from './dto/create-role.dto';
import { UpdateRoleDto } from './dto/update-role.dto';
import { PaginationDto } from 'src/common/dto';
import { AuthenticationAndAuthorization } from '../auth/decorators';
import { Roles } from '../auth/enums';

@Controller('roles')
export class RolesController {
  constructor(private readonly rolesService: RolesService) {}

  @Post()
  @AuthenticationAndAuthorization(Roles.ADMIN, Roles.SUPER_USER)
  create(@Body() createRoleDto: CreateRoleDto) {
    return this.rolesService.create(createRoleDto);
  }

  @Get()
  @AuthenticationAndAuthorization(Roles.ADMIN, Roles.SUPER_USER)
  findAll(@Query() paginationDto: PaginationDto) {
    return this.rolesService.findAll(paginationDto);
  }

  @Get(':id')
  @AuthenticationAndAuthorization(Roles.ADMIN, Roles.SUPER_USER)
  findOne(@Param('id', ParseUUIDPipe) id: string) {
    return this.rolesService.findOne(id);
  }

  @Patch(':id')
  @AuthenticationAndAuthorization(Roles.ADMIN, Roles.SUPER_USER)
  update(@Param('id', ParseUUIDPipe) id: string, @Body() updateRoleDto: UpdateRoleDto) {
    return this.rolesService.update(id, updateRoleDto);
  }

  @Delete(':id')
  @AuthenticationAndAuthorization(Roles.ADMIN, Roles.SUPER_USER)
  remove(@Param('id', ParseUUIDPipe) id: string) {
    return this.rolesService.remove(id);
  }
}
