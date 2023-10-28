import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateTableUsersVerifyCodes1698497175925 implements MigrationInterface {
    name = 'CreateTableUsersVerifyCodes1698497175925';

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
                "createdAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
                "updatedAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
                CONSTRAINT "PK_a3ffb1c0c8416b9fc6f907b7433" PRIMARY KEY ("id")
            )
        `);
        await queryRunner.query(`
            CREATE UNIQUE INDEX "IDX_97672ac88f789774dd47f7c8be" ON "users" ("email")
        `);
        await queryRunner.query(`
            CREATE TABLE "verify_codes" (
                "id" SERIAL NOT NULL,
                "userId" integer NOT NULL,
                "code" character varying NOT NULL,
                "expiredAt" TIMESTAMP WITH TIME ZONE NOT NULL,
                "status" smallint NOT NULL DEFAULT '1',
                CONSTRAINT "PK_321d3f831892a0af045143c4e7b" PRIMARY KEY ("id")
            )
        `);
        await queryRunner.query(`
            ALTER TABLE "verify_codes"
            ADD CONSTRAINT "FK_298043177d17a1a99e469aabd94" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE NO ACTION
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            ALTER TABLE "verify_codes" DROP CONSTRAINT "FK_298043177d17a1a99e469aabd94"
        `);
        await queryRunner.query(`
            DROP TABLE "verify_codes"
        `);
        await queryRunner.query(`
            DROP INDEX "public"."IDX_97672ac88f789774dd47f7c8be"
        `);
        await queryRunner.query(`
            DROP TABLE "users"
        `);
    }
}
