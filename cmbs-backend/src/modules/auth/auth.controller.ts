import { Controller, Post, Body, Get, UseGuards, Headers } from '@nestjs/common';
import { AuthService } from './auth.service';
import { SignInDto } from './dto/sign-in.dto';
import { SignUpDto } from './dto/sign-up.dto';
import { AuthGuard } from '@nestjs/passport';
import { AuthenticationAndAuthorization, GetUser } from './decorators';
import { User } from '../users/entities/user.entity';
import { VerifyRoleGuard } from './guards';
import { Roles } from './enums';
import { ProtectedRouteByRole } from './decorators/protected-route-by-role.decorator';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
  ) {}

  @Post('sign-in')
  signIn(@Body() signInDto: SignInDto) {
    return this.authService.signIn(signInDto);
  }

  @Post('sign-up')
  signUp(@Body() signUpDto: SignUpDto) {
    return this.authService.signUp(signUpDto);
  }

  @Get('refresh-jwt')
  @AuthenticationAndAuthorization()
  refreshJwt (
    @GetUser() user: User
  ) {
    return this.authService.refreshToken(user);
  }

  // Estas rutas son meramente para explicar Decoradores o guards
  @Get('test-private-route')
  @UseGuards(AuthGuard())
  testingPrivateRoute (
    // @Req() user: User,
    @GetUser() user: User
    // @GetUser('email') user: User
  ) {
    console.log({user});
    return {
      data: 'Testing Private Route Works!',
      user: user,
    };
  }

  @Get('get-raw-headers')
  @UseGuards(AuthGuard())
  getRawHeaders (
    //@GetRawHeaders() rawHeaders: string[],
    @Headers() rawHeaders
  ) {
    return {
      rawHeaders: rawHeaders
    };
  }

  @Get('only-admins-route')
  // Si descomentas este @SetMetadata(META_ROLES, [Roles.ADMIN, Roles.SUPER_USER]) quitar el @ProtectedRouteByRole(Roles.ADMIN)
  @ProtectedRouteByRole(Roles.ADMIN, Roles.SUPER_USER) // autorizacion y el de authenticacion
  @UseGuards(AuthGuard(), VerifyRoleGuard) // autorizacion y el de authenticacion
  routeOnlyForAdmins(
    @GetUser() user: User,
  ) {
    return {
      message: 'Admin & Super User Authorized',
      user: user,
    };
  }

  // Esto es similar al de arriba pero usando dos decoradores en uno solo, el de roles: autorizacion y el de authenticacion
  @Get('only-doctors-route')
  @AuthenticationAndAuthorization(Roles.DOCTOR)
  routeOnlyForDoctors(
    @GetUser() user: User,
  ) {
    return {
      message: 'Doctor Authorized',
      user: user,
    };
  }
}
