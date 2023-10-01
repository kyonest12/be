import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateTableTodos1696181827031 implements MigrationInterface {
    name = 'CreateTableTodos1696181827031';

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            CREATE TABLE "todos" (
                "id" SERIAL NOT NULL,
                "user_id" integer NOT NULL,
                "title" character varying NOT NULL,
                "description" text,
                "done" boolean NOT NULL DEFAULT false,
                "is_public" boolean NOT NULL DEFAULT false,
                "deleted_at" TIMESTAMP WITH TIME ZONE,
                "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
                "updated_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
                "userId" integer,
                CONSTRAINT "PK_ca8cafd59ca6faaf67995344225" PRIMARY KEY ("id")
            )
        `);
        await queryRunner.query(`
            ALTER TABLE "todos"
            ADD CONSTRAINT "FK_4583be7753873b4ead956f040e3" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE NO ACTION
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            ALTER TABLE "todos" DROP CONSTRAINT "FK_4583be7753873b4ead956f040e3"
        `);
        await queryRunner.query(`
            DROP TABLE "todos"
        `);
    }
}
