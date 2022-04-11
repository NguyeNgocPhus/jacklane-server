import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { UserRepository } from '../../repositories/user.repository';
import { CreateUserDto } from './dto/create-user.dto';
import { InjectMapper } from '@automapper/nestjs';
import { Mapper } from '@automapper/core';
import { UserDto } from './dto/user.dto';
import { UserReadModel } from '../../../core/entities/user.entity';
import { Claim } from '../../common/authentication/claims/claims';
import { DateTimeHelper, UuidHelper } from '../../common/helper';
import { IPasswordService } from '../../../core/common/services/passoword.interface';
import { IConfigService } from '../../../core/common/services/config.interface';
import { LoginDto } from './dto/login.dto';
import { EmailNotExistException } from '../../common/exceptions/email-not-exist.exception';
import { JwtService } from '@nestjs/jwt';
import { SignInWithPasswordResponseDto } from './dto/login-response.dto';
import { response } from 'express';
import { ProfileResponseDto } from './dto/profile-response.dto';


@Injectable()
export class UserService{
  constructor(private readonly userRepository: UserRepository,
              @InjectMapper() private mapper:Mapper,
              private readonly passwordService:IPasswordService,
              private readonly jwtService:JwtService
              ) {
  }

  async createUser(body:CreateUserDto,claim:Claim){

     body.password =await this.passwordService.hashPassword(body.password);
     const userReadModel =  this.mapper.map(body,UserReadModel,CreateUserDto)
     userReadModel.id = UuidHelper.newUuid();
     userReadModel.createdById = claim.id;
     userReadModel.createdByName = claim.name;
     userReadModel.createdDate = DateTimeHelper.getNowUnix();
     userReadModel.modifiedById = claim.id;
     userReadModel.modifiedByName = claim.name;
     userReadModel.modifiedDate = DateTimeHelper.getNowUnix();
     // console.log(userReadModel);
     const user =   await this.userRepository.createUserAsync(userReadModel);
     return this.mapper.map(user,UserDto,UserReadModel);
  }
  async loginByPassword(body:LoginDto){
      const existUser =  await this.userRepository.getUserByEmailAsync(body.email);

      if(!existUser){
          throw new NotFoundException({message:'khong ton tai email',statusCode:400,error:NotFoundException.name,data:null});
      }

      if(!await this.passwordService.verifyHashPassword(body.password,existUser.password)){
          throw new BadRequestException({message:'mat khau khong dung',statusCode:400,error:BadRequestException.name,data:null})
      }

      const claim = new Claim();
      claim.id = existUser.id;
      claim.name = existUser.name;
      claim.iss = "";
      claim.iat = DateTimeHelper.getNowUnix();
      claim.jti = UuidHelper.newUuid();
      claim.permissions = existUser.permissions;
      claim.aud = "this.configService.get('JWT_AUDIENCE')";
      claim.sub = 'jacklane';

      const token = await  this.jwtService.signAsync(JSON.stringify(claim));
      const refreshToken = await this.jwtService.signAsync(JSON.stringify(claim));

      const response = new SignInWithPasswordResponseDto();
      response.token = token;
      response.refreshToken = refreshToken;
      return response;
  }
  async getProfile (claim:Claim) {
      const user = await this.userRepository.getUserById(claim.id);


      return this.mapper.map(user,ProfileResponseDto,UserReadModel);
  }
}