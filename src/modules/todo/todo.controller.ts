import { Body, Controller, Delete, Get, Param, Post, Put, Query } from '@nestjs/common';
import { Auth } from '../../auth/decorators/auth.decorator';
import { TodoService } from './todo.service';
import { AuthUser } from '../../auth/decorators/user.decorator';
import { User } from '../../database/entities/user.entity';
import { QueryDto } from '../../common/dto/query.dto';
import { IdParam } from '../../common/dto/id-param.dto';
import { CreateTodoDto } from './dto/create.dto';
import { UpdateTodoDto } from './dto/update.dto';
import { ApiTags } from '@nestjs/swagger';

@Controller('todo')
@Auth()
@ApiTags('Todo')
export class TodoController {
    constructor(private todoService: TodoService) {}

    @Get()
    async getListTodos(@AuthUser() user: User, @Query() query: QueryDto) {
        return this.todoService.list(user.id, query);
    }

    @Get('/:id')
    async getTodoById(@AuthUser() user: User, @Param() { id }: IdParam) {
        return this.todoService.one(user.id, id);
    }

    @Post()
    async createTodo(@AuthUser() user: User, @Body() body: CreateTodoDto) {
        return this.todoService.create(user.id, body);
    }

    @Put('/:id')
    async updateTodo(@AuthUser() user: User, @Param() { id }: IdParam, @Body() body: UpdateTodoDto) {
        return this.todoService.update(user.id, id, body);
    }

    @Delete('/:id')
    async deleteTodo(@AuthUser() user: User, @Param() { id }: IdParam) {
        return this.todoService.delete(user.id, id);
    }
}
