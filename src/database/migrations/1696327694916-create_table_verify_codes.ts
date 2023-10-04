import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateTableVerifyCodes1696327694916 implements MigrationInterface {
    name = 'CreateTableVerifyCodes1696327694916';

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            CREATE TABLE "verify_codes" (
                "id" SERIAL NOT NULL,
                "user_id" integer NOT NULL,
                "code" character varying NOT NULL,
                "expired_at" TIMESTAMP WITH TIME ZONE NOT NULL,
                "status" smallint NOT NULL DEFAULT '1',
                CONSTRAINT "PK_321d3f831892a0af045143c4e7b" PRIMARY KEY ("id")
            )
        `);
        await queryRunner.query(`
            ALTER TABLE "verify_codes"
            ADD CONSTRAINT "FK_8e87013bc22bd8ac015bee9127d" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE NO ACTION
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            ALTER TABLE "verify_codes" DROP CONSTRAINT "FK_8e87013bc22bd8ac015bee9127d"
        `);
        await queryRunner.query(`
            DROP TABLE "verify_codes"
        `);
    }
}
