import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { UpdatePutUserDto } from './dto/update-put-user.dto';
import { UpdatePatchUserDto } from './dto/update-patch-user.dto';

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

  async list() {
    return await this.Prisma.user.findMany();
  }

  async show(id: number) {
    return this.Prisma.user.findUnique({ where: { id } });
  }

  async update(
    id: number,
    { name, email, password, birthAt }: UpdatePutUserDto,
  ) {
    return this.Prisma.user.update({
      data: {
        name,
        email,
        password,
        birthAt: birthAt ? new Date(birthAt) : null,
      },
      where: {
        id,
      },
    });
  }
  async updatePartial(id: number, data: UpdatePatchUserDto) {
    console.log(data);

    return this.Prisma.user.update({
      data,
      where: {
        id,
      },
    });
  }
}
