import { Module } from '@nestjs/common';

import { options } from './database/orm.config';
import { ConfigModule } from '@nestjs/config';
import { ServeStaticModule } from '@nestjs/serve-static';
import { AuthModule } from './auth/auth.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { join } from 'path';
import { entities } from './database';
import { ProfileController } from './modules/profile/profile.controller';
import { AuthController } from './auth/auth.controller';

@Module({
    imports: [
        AuthModule,
        ServeStaticModule.forRoot({
            rootPath: join(__dirname, '..', 'uploads'),
        }),
        ConfigModule.forRoot(),
        TypeOrmModule.forRoot(options),
        TypeOrmModule.forFeature(entities),
    ],
    controllers: [AuthController, ProfileController],
    providers: [],
})
export class AppModule {}
