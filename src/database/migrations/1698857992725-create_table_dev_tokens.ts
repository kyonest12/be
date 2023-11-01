import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateTableDevTokens1698857992725 implements MigrationInterface {
    name = 'CreateTableDevTokens1698857992725';

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            CREATE TABLE "dev_tokens" (
                "id" SERIAL NOT NULL,
                "userId" integer NOT NULL,
                "type" smallint NOT NULL,
                "token" character varying NOT NULL,
                "createdAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
                "updatedAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
                CONSTRAINT "PK_c98022b4ca3d592bd2df65f4a5a" PRIMARY KEY ("id")
            )
        `);
        await queryRunner.query(`
            ALTER TABLE "dev_tokens"
            ADD CONSTRAINT "FK_a5c679d41258059ff0022546b07" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE NO ACTION
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            ALTER TABLE "dev_tokens" DROP CONSTRAINT "FK_a5c679d41258059ff0022546b07"
        `);
        await queryRunner.query(`
            DROP TABLE "dev_tokens"
        `);
    }
}
