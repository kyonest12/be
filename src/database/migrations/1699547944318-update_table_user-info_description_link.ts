import { MigrationInterface, QueryRunner } from "typeorm";

export class UpdateTableUserInfoDescriptionLink1699547944318 implements MigrationInterface {
    name = 'UpdateTableUserInfoDescriptionLink1699547944318'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            ALTER TABLE "user_info"
            ADD "link" character varying
        `);
        await queryRunner.query(`
            ALTER TABLE "user_info"
            ADD "description" character varying
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            ALTER TABLE "user_info" DROP COLUMN "description"
        `);
        await queryRunner.query(`
            ALTER TABLE "user_info" DROP COLUMN "link"
        `);
    }

}
