import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UsersModule } from '../users/users.module';
import { RolesModule } from '../roles/roles.module';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { PassportModule } from '@nestjs/passport';
import { JwtSrategy } from './strategies';

@Module({
  imports: [
    ConfigModule,
    UsersModule, 
    RolesModule,
    PassportModule.register({ 
      defaultStrategy: 'jwt' 
    }),
    JwtModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        secret: configService.get('JWT_SECRET'),
        signOptions: {
          expiresIn: '1h',
        },
      }),
    }),
  ],
  controllers: [AuthController],
  providers: [
    AuthService,
    JwtSrategy, // TODO: OJO LOS STRATEGIES SE EXPORTAN E IMPORTAN
  ],
  exports: [
    JwtModule,
    JwtSrategy, // TODO: OJO LOS STRATEGIES SE EXPORTAN E IMPORTAN
    PassportModule,
  ],
})
export class AuthModule {}
