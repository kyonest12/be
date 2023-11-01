import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateTableUserInfo1698855846026 implements MigrationInterface {
    name = 'CreateTableUserInfo1698855846026';

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            CREATE TABLE "user_info" (
                "id" SERIAL NOT NULL,
                "userId" integer NOT NULL,
                "coverImage" character varying,
                "address" character varying,
                "city" character varying,
                "country" character varying,
                CONSTRAINT "REL_3a7fa0c3809d19eaf2fb4f6594" UNIQUE ("userId"),
                CONSTRAINT "PK_273a06d6cdc2085ee1ce7638b24" PRIMARY KEY ("id")
            )
        `);
        await queryRunner.query(`
            ALTER TABLE "user_info"
            ADD CONSTRAINT "FK_3a7fa0c3809d19eaf2fb4f65949" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE NO ACTION
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            ALTER TABLE "user_info" DROP CONSTRAINT "FK_3a7fa0c3809d19eaf2fb4f65949"
        `);
        await queryRunner.query(`
            DROP TABLE "user_info"
        `);
    }
}
