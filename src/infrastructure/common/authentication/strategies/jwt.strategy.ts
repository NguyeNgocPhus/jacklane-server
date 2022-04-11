import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from "passport-jwt";
import { IConfigService } from '../../../../core/common/services/config.interface';
import { BadRequestException, ForbiddenException, Injectable, UnauthorizedException } from '@nestjs/common';
import { UserService } from '../../../components/auth/user.service';



@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy){
  constructor(private readonly configService:IConfigService,private userService:UserService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      passReqToCallback: false,
      secretOrKey: configService.get("JWT_SECRET_KEY"),
      ignoreExpiration: true,
    });

  }


  async validate(claim: any, done) {
    console.log(claim);
    return claim;
  }

}