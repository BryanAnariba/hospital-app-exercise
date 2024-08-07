import { PassportStrategy } from "@nestjs/passport";
import { ExtractJwt, Strategy } from "passport-jwt";
import { JWTPayload } from "../interfaces";
import { User } from "src/modules/users/entities/user.entity";
import { UsersService } from "src/modules/users/users.service";
import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";

@Injectable()
export class JwtSrategy extends PassportStrategy(Strategy) {

  constructor (
    private readonly usersService: UsersService,
    private readonly configService: ConfigService,
  ) {
    super({
      secretOrKey: configService.get('JWT_SECRET'),
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    });
  }

  async validate(jwtPayload: JWTPayload): Promise<User> {
    try {
      const {id} = jwtPayload;
      const user = await this.usersService.findOneById(id);

      if (!user) throw new HttpException(`Unauthorized: token or user is not valid.`, HttpStatus.UNAUTHORIZED);
      if (!user.isActive) throw new HttpException(`Unauthorized: user is not active.`, HttpStatus.UNAUTHORIZED);
      
      return user;
    } catch (error) {
      if (error instanceof HttpException) throw error;
      throw new HttpException(`Sometime went wrong: Unauthorized`, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
}