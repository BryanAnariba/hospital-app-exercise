import { createParamDecorator, ExecutionContext, HttpException, HttpStatus } from '@nestjs/common';

export const GetUser = createParamDecorator((data, ctx: ExecutionContext) => {
  // console.log("Data son los parametros del decorador @GetUser('email'): ", data);
  const request = ctx.switchToHttp().getRequest();
  const user = request.user;
  if (!user) throw new HttpException(`Logged user not found in request headers `, HttpStatus.INTERNAL_SERVER_ERROR);
  return (data) ? user[data] : user;
});
