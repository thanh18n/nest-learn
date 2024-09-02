import { User } from "src/entities/user.entity";
import { Repository } from "typeorm";

export class UserRepository extends Repository<User> { }