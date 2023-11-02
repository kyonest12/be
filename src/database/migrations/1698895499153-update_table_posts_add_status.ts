import { MigrationInterface, QueryRunner } from 'typeorm';

export class UpdateTablePostsAddStatus1698895499153 implements MigrationInterface {
    name = 'UpdateTablePostsAddStatus1698895499153';

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            ALTER TABLE "posts"
            ADD "status" character varying
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            ALTER TABLE "posts" DROP COLUMN "status"
        `);
    }
}
