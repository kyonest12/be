import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JwtStrategy } from './strategies/jwt.strategy';
import { AuthService } from './auth.service';
import { User } from '../database/entities/user.entity';
import { UserGuard } from './guards/user.guard';
import { AuthController } from './auth.controller';
import { MailerModule } from '@nestjs-modules/mailer';
import { VerifyCode } from '../database/entities/verify-code.entity';

@Module({
    imports: [
        JwtModule.register({
            secret: process.env.JWT_SECRET,
        }),
        TypeOrmModule.forFeature([User, VerifyCode]),
        MailerModule.forRoot({
            transport: {
                host: process.env.SMTP_HOST,
                auth: {
                    user: process.env.SMTP_USER,
                    pass: process.env.SMTP_PASSWORD,
                },
            },
            defaults: {
                from: `"Info" <${process.env.SMTP_EMAIL_FROM}>`,
            },
        }),
    ],
    controllers: [AuthController],
    providers: [AuthService, JwtStrategy, UserGuard],
    exports: [AuthService],
})
export class AuthModule {}
