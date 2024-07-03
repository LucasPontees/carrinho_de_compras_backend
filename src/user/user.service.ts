import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { UpdatePutUserDto } from './dto/update-put-user.dto';
import { UpdatePatchUserDto } from './dto/update-patch-user.dto';

@Injectable()
export class UserService {
  constructor(private readonly Prisma: PrismaService) { }
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
    { name, email, password }: UpdatePutUserDto,
  ) {

    await this.exists(id);


    return this.Prisma.user.update({
      data: {
        name,
        email,
        password,
      },
      where: {
        id,
      },
    });
  }
  async updatePartial(id: number, data: UpdatePatchUserDto) {

    await this.exists(id);


    return this.Prisma.user.update({
      data,
      where: {
        id,
      },
    });
  }

  async delete(id: number) {

    await this.exists(id);

    return this.Prisma.user.delete({
      where: {
        id,
      },
    })
  }

  async exists(id: number) {
    if (!(await this.show(id))) {
      throw new NotFoundException(`Usuario com id: ${id}` + ' não encontrado');
    }
  }
}
