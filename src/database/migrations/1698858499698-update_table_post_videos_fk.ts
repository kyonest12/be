import { MigrationInterface, QueryRunner } from 'typeorm';

export class UpdateTablePostVideosFk1698858499698 implements MigrationInterface {
    name = 'UpdateTablePostVideosFk1698858499698';

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            ALTER TABLE "post_videos"
            ADD CONSTRAINT "UQ_3d7175726fe241e386835216df0" UNIQUE ("postId")
        `);
        await queryRunner.query(`
            ALTER TABLE "post_videos"
            ADD CONSTRAINT "FK_3d7175726fe241e386835216df0" FOREIGN KEY ("postId") REFERENCES "posts"("id") ON DELETE CASCADE ON UPDATE NO ACTION
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            ALTER TABLE "post_videos" DROP CONSTRAINT "FK_3d7175726fe241e386835216df0"
        `);
        await queryRunner.query(`
            ALTER TABLE "post_videos" DROP CONSTRAINT "UQ_3d7175726fe241e386835216df0"
        `);
    }
}
