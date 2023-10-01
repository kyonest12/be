import { JwtSignOptions } from '@nestjs/jwt';
import { config } from 'dotenv';

config();

export const jwtSignOptions: JwtSignOptions = {
    secret: process.env.JWT_SECRET,
};

if (process.env.JWT_EXPIRATION) {
    jwtSignOptions.expiresIn = process.env.JWT_EXPIRATION;
}
