import { MigrationInterface, QueryRunner } from 'typeorm';

export class UpdateTablePostVideosAddOrder1698896270194 implements MigrationInterface {
    name = 'UpdateTablePostVideosAddOrder1698896270194';

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            ALTER TABLE "post_images"
            ADD "order" smallint NOT NULL DEFAULT '0'
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            ALTER TABLE "post_images" DROP COLUMN "order"
        `);
    }
}
