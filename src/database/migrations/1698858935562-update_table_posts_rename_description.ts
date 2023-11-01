import { MigrationInterface, QueryRunner } from 'typeorm';

export class UpdateTablePostsRenameDescription1698858935562 implements MigrationInterface {
    name = 'UpdateTablePostsRenameDescription1698858935562';

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            ALTER TABLE "posts"
                RENAME COLUMN "descriptions" TO "description"
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            ALTER TABLE "posts"
                RENAME COLUMN "description" TO "descriptions"
        `);
    }
}
