import { Injectable } from "@nestjs/common";
import { CreateUserDTO } from "./dto/create-user.dto";

// TODO: Add prisma client

@Injectable()
export class UserService {
  create(user: CreateUserDTO): string {
    console.log(user);
    return "Created successfully";
  }
}
