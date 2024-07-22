import { Injectable } from '@nestjs/common';
import { SignInDto } from './dto/sign-in.dto';
import { SignUpDto } from './dto/sign-up.dto';
import { UsersService } from '../users/users.service';
import { RolesService } from '../roles/roles.service';

@Injectable()
export class AuthService {

  constructor (
    private readonly usersService: UsersService,
    private readonly rolesService: RolesService
  ) {}
  
  public async signIn (signInDto: SignInDto) {

  }

  public async signUp (signUpDto: SignUpDto) {
    
  }
}
