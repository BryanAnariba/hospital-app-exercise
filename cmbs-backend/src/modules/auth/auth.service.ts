import { Injectable } from '@nestjs/common';
import { SignInDto } from './dto/sign-in.dto';
import { SignUpDto } from './dto/sign-up.dto';

@Injectable()
export class AuthService {
  
  public async signIn (signInDto: SignInDto) {

  }

  public async signUp (signUpDto: SignUpDto) {
    
  }
}
