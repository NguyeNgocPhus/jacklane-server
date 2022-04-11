import { IsEnum, IsNotEmpty, IsString } from 'class-validator';
import { TypeProductEnum } from '../../../../core/common/enum/type-product.enum';


export class CreateTypeProductDto {
    @IsNotEmpty()
    @IsString()
    name:string;
    @IsNotEmpty()
    @IsString()
    code:string;
    @IsNotEmpty()
    @IsEnum(TypeProductEnum)
    type:TypeProductEnum;
}