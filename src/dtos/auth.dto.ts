import { IsNotEmpty } from "class-validator";

export class AuthDto {
    @IsNotEmpty()
    username: string;

    @IsNotEmpty()
    password: string;
}

export class JwtDTO {
    username: string;
}