import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Brackets, Repository } from 'typeorm';
import { Todo } from '../../database/entities/todo.entity';
import { getOffsetLimit, getSearch } from '../../utils/pagination.util';
import { QueryDto } from '../../common/dto/query.dto';
import { CreateTodoDto } from './dto/create.dto';
import { UpdateTodoDto } from './dto/update.dto';
import { AppException } from '../../exceptions/app.exception';

@Injectable()
export class TodoService {
    constructor(
        @InjectRepository(Todo)
        private todoRepo: Repository<Todo>,
    ) {}

    async list(user_id, { page, page_size, keyword }: QueryDto) {
        const [offset, limit] = getOffsetLimit(page, page_size);
        const search = getSearch(keyword);

        const [records, total] = await this.todoRepo
            .createQueryBuilder('todo')
            .innerJoinAndSelect('todo.user', 'user')
            .where('(todo.title ILIKE :search OR todo.description ILIKE :search)', { search })
            .andWhere(new Brackets((qb) => qb.where({ user_id }).orWhere({ is_public: true })))
            .offset(offset)
            .limit(limit)
            .getManyAndCount();

        return {
            page,
            page_size,
            total_pages: Math.ceil(total / page_size),
            records,
        };
    }

    async one(user_id: number, id: number) {
        const todo = await this.todoRepo.findOne({
            where: {
                id,
                user_id,
            },
            relations: ['user'],
        });

        if (!todo) {
            throw new AppException(9994, 404);
        }

        return todo;
    }

    async create(user_id: number, body: CreateTodoDto) {
        const todo = new Todo({
            ...body,
            user_id,
        });
        return this.todoRepo.save(todo);
    }

    async update(user_id: number, id: number, body: UpdateTodoDto) {
        const todo = await this.one(user_id, id);
        Object.assign(todo, body);
        return this.todoRepo.save(todo);
    }

    async delete(user_id: number, id: number) {
        const todo = await this.one(user_id, id);
        return this.todoRepo.softRemove(todo);
    }
}
