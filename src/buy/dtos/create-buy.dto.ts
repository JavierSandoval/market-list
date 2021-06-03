import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsBoolean, IsNumber, IsDate,IsObject, IsArray } from 'class-validator';
import { User } from 'src/user/entities/user.entity';
import { Product } from 'src/product/entities/product.entity';

export class CreateBuyDto {

    @ApiProperty()
    @IsString()
    id: string;

    @ApiProperty()
    @IsDate()
    date: Date;

    @ApiProperty()
    @IsNumber()
    totalPrice: number;

    @ApiProperty()
    @IsNumber()
    totalProducts: number;

    @ApiProperty()
    @IsBoolean()
    state: boolean;

    @ApiProperty()
    @IsObject()
    user: User;

    @ApiProperty()
    @IsArray()
    products: Product[];
}
