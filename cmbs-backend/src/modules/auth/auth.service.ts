import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { SignInDto } from './dto/sign-in.dto';
import { SignUpDto } from './dto/sign-up.dto';
import { UsersService } from '../users/users.service';
import { RolesService } from '../roles/roles.service';
import { JwtService } from '@nestjs/jwt';
import { JWTPayload } from './interfaces';
import { compareEncryption } from 'src/config';
import { User } from '../users/entities/user.entity';

// TODO: estas instalaciones al parecer son las unicas necesarias para usar passport con jwt
// npm install --save @nestjs/passport passport
// npm install --save @nestjs/jwt passport-jwt
// npm install --save-dev @types/passport-jwt

@Injectable()
export class AuthService {

  constructor (
    private readonly usersService: UsersService,
    private readonly rolesService: RolesService,
    private readonly jwtService: JwtService,
  ) {}
  
  public async signIn (signInDto: SignInDto) {
    try {
      const existsUser = await this.usersService.findOneByEmail(signInDto.email);
      if (!existsUser) throw new HttpException(`Invalid Credentials - Email`, HttpStatus.UNAUTHORIZED);
      if (!compareEncryption(signInDto.password, existsUser.password)) throw new HttpException(`Invalid Credentials - Password`, HttpStatus.UNAUTHORIZED);
      if (!existsUser.isActive) throw new HttpException(`Inactive user`, HttpStatus.UNAUTHORIZED);
      delete existsUser.password;
      return {
        user: existsUser,
        token: this.createJWT({
          id: existsUser.id, 
          email: existsUser.email,
          role: existsUser.role,
        }),
      };
    } catch (error) {
      if (error instanceof HttpException) throw error;
      throw new HttpException(`Sometime went user is doing its logging: ${error}`, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  public async signUp (signUpDto: SignUpDto) {
    try {
      const defaultRole= await this.rolesService.findOneByName('ADMIN');
      if (!defaultRole) throw new HttpException(`The default role does not found`, HttpStatus.NOT_FOUND);
      const userCreated = await this.usersService.create({...signUpDto, role: defaultRole.id});
      return {
        user: userCreated,
        token: this.createJWT({
          id: userCreated.id, 
          email: userCreated.email, 
          role: defaultRole
        }),
      };
    } catch (error) {
      if (error instanceof HttpException) throw error;
      if (error.code == 23505) throw new HttpException(`Role duplicate`, HttpStatus.BAD_REQUEST);
      throw new HttpException(`Sometime went wrong register the new user: ${error}`, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  public async refreshToken (user: User) {
    return {
      user: user,
      token: this.createJWT({
        id: user.id, 
        email: user.email, 
        role: user.role
      }),
    };
  }

  public createJWT (jwtPayload: JWTPayload): string {
    const token: string = this.jwtService.sign(jwtPayload);
    return token;
  }
}
