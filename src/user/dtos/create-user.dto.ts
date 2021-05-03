import { ApiProperty } from '@nestjs/swagger';
import { IsString, MinLength, MaxLength,IsEmail, IsNumber } from 'class-validator';

export class CreateUserDto {

    @ApiProperty()
    @IsNumber()
    id: number;

    @ApiProperty()
    @IsEmail()
    email: string;
    
    @ApiProperty()
    @IsString()
    @MinLength(8)
    @MaxLength(45)
    password: string;
}
