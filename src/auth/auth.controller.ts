import { Controller, Get, Post, UseGuards, Body } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { User as UserEntity } from '../user/entities/user.entity';
import { User } from '../common/decorators';
import { AuthService } from './auth.service';
import { JwtAuthGuard } from './guards';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {

    constructor(
        private readonly authService: AuthService
    ){}

    @UseGuards(AuthGuard('local'))
    @Post('login')
    async login(@User() @Body() user: UserEntity){
        const data = await this.authService.login(user);
        const { accessToken } = data;

        return {
            message: 'Login exitoso',
            accessToken
        }
    }

    @UseGuards(JwtAuthGuard)
    @ApiBearerAuth()
    @Get()
    profile(@User() user: UserEntity){
        return {
            message: 'Tus datos de perfil',
            user
        }
    }
}
