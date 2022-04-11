import { Body, Controller, Request, Get, Post, UseGuards, BadRequestException } from '@nestjs/common';
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
import { UserRepository } from '../../repositories/user.repository';
import { LoginDto } from './dto/login.dto';
import { SignInWithPasswordResponseDto } from './dto/login-response.dto';


@Controller('auth')
export class UserController {
  constructor(private readonly userService: UserService,
              private readonly configService: IConfigService,
              private readonly jwtService: JwtService,
              private readonly userRepository:UserRepository
  ) {
  }

  @Post('/user')
  @Permissions(PermConst.ROOT)
  @UseGuards(JwtAuthGuards, PermissionGuard)
  async createUser(@Body() body: CreateUserDto, @Request() req) {
    try {
      const user = await this.userService.createUser(body, req.user);
      // console.log(user);
      return {
        data:user,
        message:"Success",
        statusCode:200
      };
    }catch (e) {
      throw new BadRequestException({message:"something wrong"});
    }

  }

  @Get('/profile')
  @UseGuards(JwtAuthGuards)
  async getProfile(@Request()  req){
      try {

        const user =  await  this.userService.getProfile(req.user);
        return {
          data:user,
          message:"Success",
          statusCode:200
        };
      }catch (e) {
        throw e;
      }
  }
  @Post("/login")
  async loginByPassword(@Body() body:LoginDto){
    try {

      const token = await this.userService.loginByPassword(body);
      return {
        data:token,
        message:"Success",
        statusCode:200
      };
    }catch (e) {
      //return e;
      throw e;

    }
  }

  @Get('/getToken')
  async loginWithPassword() {
    const claim = new Claim();
    claim.id = UuidHelper.newUuid();
    claim.name = 'Doan Vu Van';
    claim.iss = this.configService.get('JWT_ISSUER');
    claim.iat = DateTimeHelper.getNowUnix();
    claim.jti = UuidHelper.newUuid();
    claim.permissions = [PermConst.ROOT, PermConst.ADMIN];
    claim.roles = ['admin', 'employee'];
    claim.aud = this.configService.get('JWT_AUDIENCE');
    claim.sub = 'ChoDaiTu.Vn Claim';
    console.log(claim);

    return await this.jwtService.signAsync(JSON.stringify(claim));
  }
}