import { Body, Controller,Request, Get, Post, UseGuards } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { Claim } from '../../common/authentication/claims/claims';
import { DateTimeHelper, UuidHelper } from '../../common/helper';
import { IConfigService } from '../../../core/common/services/config.interface';
import { PermConst } from '../../common/constants/perm.contants';
import { JwtService } from '@nestjs/jwt';
import { JwtStrategy } from '../../common/authentication/strategies/jwt.strategy';
import { JwtAuthGuards } from '../../common/authentication/guards/jwt.auth.guards';
import { PermissionGuard } from '../../common/authorization/guards/permission.guards';
import { Permissions } from '../../common/authorization/decorator/permission.decorator';


@Controller('auth')
export class UserController{
  constructor(private readonly userService: UserService,
              private readonly configService:IConfigService,
              private readonly jwtService:JwtService
              ) {
  }
  @Post()
  @Permissions(PermConst.ROOT)
  @UseGuards(JwtAuthGuards,PermissionGuard)
  async createUser(@Body() body:CreateUserDto ,@Request() req){

  }

  @Get('/getToken')
  async loginWithPassword() {
    const claim = new Claim();
    claim.id = UuidHelper.newUuid();
    claim.name = "Doan Vu Van";
    claim.iss = this.configService.get("JWT_ISSUER");
    claim.iat = DateTimeHelper.getNowUnix();
    claim.jti = UuidHelper.newUuid();
    claim.permissions = [PermConst.ROOT, PermConst.ADMIN];
    claim.roles = ["admin", "employee"];
    claim.aud = this.configService.get("JWT_AUDIENCE");
    claim.sub = "ChoDaiTu.Vn Claim";
    console.log(claim);

    return await this.jwtService.signAsync(JSON.stringify(claim));
  }
}