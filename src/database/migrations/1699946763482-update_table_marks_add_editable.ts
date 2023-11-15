import { MigrationInterface, QueryRunner } from 'typeorm';

export class UpdateTableMarksAddEditable1699946763482 implements MigrationInterface {
    name = 'UpdateTableMarksAddEditable1699946763482';

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            ALTER TABLE "marks"
            ADD "editable" boolean NOT NULL DEFAULT false
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            ALTER TABLE "marks" DROP COLUMN "editable"
        `);
    }
}
