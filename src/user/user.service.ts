import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class UserService {
  constructor(private readonly Prisma: PrismaService) {}
  async create({ email, name, password }: CreateUserDto) {
    return await this.Prisma.user.create({
      data: {
        email,
        name,
        password,
      },
    });
  }
}
