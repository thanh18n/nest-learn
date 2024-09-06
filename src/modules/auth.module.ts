import { Module } from "@nestjs/common";
import { JwtModule } from "@nestjs/jwt";
import { PassportModule } from "@nestjs/passport";
import { TypeOrmModule } from "@nestjs/typeorm";
import { AuthController } from "src/controllers/auth.controller";
import { User } from "src/entities/user.entity";
import { AuthService } from "src/services/auth.service";

@Module({
    imports: [
        TypeOrmModule.forFeature([User]),
        JwtModule.register({
            secret: 'secretKey',
            signOptions: {
                expiresIn: '1h'
            }
        })
    ],
    controllers: [AuthController],
    providers: [AuthService],
})

export class AuthModule { }