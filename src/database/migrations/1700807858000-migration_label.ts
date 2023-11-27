import { MigrationInterface, QueryRunner } from "typeorm";

export class MigrationLabel1700807858000 implements MigrationInterface {
    name = 'MigrationLabel1700807858000'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            ALTER TABLE "users"
            ADD "birthday" TIMESTAMP
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            ALTER TABLE "users" DROP COLUMN "birthday"
        `);
    }

}
