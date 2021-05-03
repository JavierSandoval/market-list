import { Body, Controller, Delete, Get, Param, ParseIntPipe, Post, Put } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { UserService } from './user.service';
import { User } from './entities/user.entity';
import { CreateUserDto, EditUserDto } from './dtos';

@ApiTags('User')
@Controller('user')
export class UserController {

    constructor(
        private readonly userService: UserService
    ){}

    @Get('list')
    findAll(): Promise<User[]>{
        return this.userService.findAll();
    }

    @Get('find/:email')
    findById(@Param('email') email: string): Promise<User>{
        return this.userService.findOne(email);
    }

    @Post('create')
    create(@Body() dto: CreateUserDto){
        return this.userService.create(dto);
    }

    @Put('update/:email')
    update(@Param('email') email: string, @Body() dto: EditUserDto){
        return this.userService.editOne(email, dto);
    }

    @Delete('remove/email')
    delete(@Param('email') email: string){
        return this.userService.deleteOne(email)
    }

}
