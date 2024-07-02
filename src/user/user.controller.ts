import { Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post, Put } from "@nestjs/common";
import { CreateUserDto } from "./dto/create-user.dto";
import { UpdatePatchUserDto } from "./dto/update-patch-user.dto";

@Controller('users')
export class UserController {

    @Post()
    async create(@Body() { email, name, password }: CreateUserDto) {
        return { email, name, password };
    }

    @Get()
    async list() {
        return { user: [] };
    }
    @Get(':id')
    async readOne(@Param('id', ParseIntPipe) id: number) {
        return { user: {}, id };
    }

    @Put(':id')
    async update(@Param() params, @Body() { email, name, password }: CreateUserDto) {
        return {
            method: 'put',
            email, name, password,
            params
        };

    }

    @Patch(':id')
    async updatePartial(@Param() params, @Body() { email, name, password }: UpdatePatchUserDto) {
        return {
            method: 'patch',
            params,
            email, name, password
        };
    }

    @Delete(':id')
    async delete(@Param('id', ParseIntPipe) id) {
        return {
            id
        };
    }
} 