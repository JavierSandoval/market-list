import { Injectable } from '@nestjs/common';
import { UserService } from '../user/user.service';
import { compare } from 'bcrypt';
import { User } from '../user/entities/user.entity';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {

    constructor(
        private readonly userService: UserService,
        private readonly jwtService: JwtService
    ){}

    async validateUser(email: string, password: string){
        const user = await this.userService.findByEmail(email);

        if(user && await compare(password, user.password)){
            return user;
        }

        return null;
    }

    login(user: User){
        const { email, ...rest } = user;
        const payload = { sub: email};

        return {
            accessToken: this.jwtService.sign(payload)
        }
    }
}
