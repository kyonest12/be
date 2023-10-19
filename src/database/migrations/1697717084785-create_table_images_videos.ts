import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateTableImagesVideos1697717084785 implements MigrationInterface {
    name = 'CreateTableImagesVideos1697717084785';

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            CREATE TABLE "post_images" (
                "id" SERIAL NOT NULL,
                "post_id" integer NOT NULL,
                "url" character varying NOT NULL,
                CONSTRAINT "PK_32fe67d8cdea0e7536320d7c454" PRIMARY KEY ("id")
            )
        `);
        await queryRunner.query(`
            CREATE TABLE "post_videos" (
                "id" SERIAL NOT NULL,
                "post_id" integer NOT NULL,
                "url" character varying NOT NULL,
                CONSTRAINT "REL_3f4e9c04cfb870c7d510e600f2" UNIQUE ("post_id"),
                CONSTRAINT "PK_97a2341b3c986da2eab06594db4" PRIMARY KEY ("id")
            )
        `);
        await queryRunner.query(`
            ALTER TABLE "post_images"
            ADD CONSTRAINT "FK_cbea080987be6204e913a691aea" FOREIGN KEY ("post_id") REFERENCES "posts"("id") ON DELETE CASCADE ON UPDATE NO ACTION
        `);
        await queryRunner.query(`
            ALTER TABLE "post_videos"
            ADD CONSTRAINT "FK_3f4e9c04cfb870c7d510e600f24" FOREIGN KEY ("post_id") REFERENCES "posts"("id") ON DELETE CASCADE ON UPDATE NO ACTION
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            ALTER TABLE "post_videos" DROP CONSTRAINT "FK_3f4e9c04cfb870c7d510e600f24"
        `);
        await queryRunner.query(`
            ALTER TABLE "post_images" DROP CONSTRAINT "FK_cbea080987be6204e913a691aea"
        `);
        await queryRunner.query(`
            DROP TABLE "post_videos"
        `);
        await queryRunner.query(`
            DROP TABLE "post_images"
        `);
    }
}
