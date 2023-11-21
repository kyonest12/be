import { MigrationInterface, QueryRunner } from "typeorm";

export class UpdateTableFeelsEditable1700562163690 implements MigrationInterface {
    name = 'UpdateTableFeelsEditable1700562163690'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            ALTER TABLE "feels"
            ADD "editable" boolean NOT NULL DEFAULT false
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            ALTER TABLE "feels" DROP COLUMN "editable"
        `);
    }

}
