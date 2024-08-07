import { Controller, Get, Post, Body, Patch, Param, Delete, ParseUUIDPipe, Query } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { PaginationDto } from 'src/common/dto';
import { GetUsersByTerms } from './dto/get-users-by-terms.dto';
import { AuthenticationAndAuthorization } from '../auth/decorators';
import { Roles } from '../auth/enums';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  @AuthenticationAndAuthorization(Roles.ADMIN, Roles.SUPER_USER)
  create(@Body() createUserDto: CreateUserDto) {
    return this.usersService.create(createUserDto);
  }

  @Get()
  @AuthenticationAndAuthorization(Roles.ADMIN, Roles.SUPER_USER)
  findAll(@Query() paginationDto: PaginationDto) {
    return this.usersService.findAll(paginationDto);
  }

  @Get(':id')
  @AuthenticationAndAuthorization()
  findOne(@Param('id', ParseUUIDPipe) id: string) {
    return this.usersService.findOne(id);
  }

  @Get('/by/terms')
  @AuthenticationAndAuthorization(Roles.ADMIN, Roles.SUPER_USER)
  findByTerms(
    @Query() paginationDto: PaginationDto,
    @Body() getUsersByTerms: GetUsersByTerms
  ) {
    return this.usersService.getUsersByTerm(paginationDto, getUsersByTerms);
  }

  @Patch(':id')
  @AuthenticationAndAuthorization(Roles.ADMIN, Roles.SUPER_USER)
  update(@Param('id', ParseUUIDPipe) id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.usersService.update(id, updateUserDto);
  }

  @Delete(':id')
  @AuthenticationAndAuthorization(Roles.ADMIN, Roles.SUPER_USER)
  remove(@Param('id', ParseUUIDPipe) id: string) {
    return this.usersService.remove(id);
  }
}
