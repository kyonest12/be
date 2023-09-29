import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateTableUsers1695926146554 implements MigrationInterface {
    name = 'CreateTableUsers1695926146554';

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            CREATE TABLE "users" (
                "id" SERIAL NOT NULL,
                "email" character varying NOT NULL,
                "password" character varying NOT NULL,
                "token" character varying,
                "status" smallint NOT NULL DEFAULT '-1',
                "username" character varying,
                "avatar" character varying,
                "coins" integer NOT NULL DEFAULT '0',
                CONSTRAINT "PK_a3ffb1c0c8416b9fc6f907b7433" PRIMARY KEY ("id")
            )
        `);
        await queryRunner.query(`
            CREATE UNIQUE INDEX "IDX_97672ac88f789774dd47f7c8be" ON "users" ("email")
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            DROP INDEX "public"."IDX_97672ac88f789774dd47f7c8be"
        `);
        await queryRunner.query(`
            DROP TABLE "users"
        `);
    }
}
