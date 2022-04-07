import { AuthGuard } from '@nestjs/passport';
import { ExecutionContext, ForbiddenException, UnauthorizedException } from '@nestjs/common';
import { JsonWebTokenError } from 'jsonwebtoken';


export class JwtAuthGuards extends AuthGuard('jwt'){

}