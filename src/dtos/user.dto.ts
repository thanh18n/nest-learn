import { Timestamp } from "typeorm";

export class UserDto {
    id: number;
    username: string
    createdAt: Date;
}
