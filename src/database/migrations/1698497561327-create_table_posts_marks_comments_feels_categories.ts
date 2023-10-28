import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateTablePostsMarksCommentsFeelsCategories1698497561327 implements MigrationInterface {
    name = 'CreateTablePostsMarksCommentsFeelsCategories1698497561327';

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            CREATE TABLE "post_images" (
                "id" SERIAL NOT NULL,
                "postId" integer NOT NULL,
                "url" character varying NOT NULL,
                CONSTRAINT "PK_32fe67d8cdea0e7536320d7c454" PRIMARY KEY ("id")
            )
        `);
        await queryRunner.query(`
            CREATE TABLE "post_videos" (
                "id" SERIAL NOT NULL,
                "postId" integer NOT NULL,
                "url" character varying NOT NULL,
                CONSTRAINT "PK_97a2341b3c986da2eab06594db4" PRIMARY KEY ("id")
            )
        `);
        await queryRunner.query(`
            CREATE TABLE "comments" (
                "id" SERIAL NOT NULL,
                "markId" integer NOT NULL,
                "content" text NOT NULL,
                "posterId" integer NOT NULL,
                "createdAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
                "updatedAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
                CONSTRAINT "PK_8bf68bc960f2b69e818bdb90dcb" PRIMARY KEY ("id")
            )
        `);
        await queryRunner.query(`
            CREATE TABLE "marks" (
                "id" SERIAL NOT NULL,
                "postId" integer NOT NULL,
                "content" text NOT NULL,
                "type" smallint NOT NULL,
                "posterId" integer NOT NULL,
                "createdAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
                "updatedAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
                CONSTRAINT "PK_051deeb008f7449216d568872c6" PRIMARY KEY ("id")
            )
        `);
        await queryRunner.query(`
            CREATE TABLE "feels" (
                "id" SERIAL NOT NULL,
                "postId" integer NOT NULL,
                "type" smallint NOT NULL,
                "userId" integer NOT NULL,
                "createdAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
                "updatedAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
                CONSTRAINT "PK_332cab1304b78588d7656d2c37b" PRIMARY KEY ("id")
            )
        `);
        await queryRunner.query(`
            CREATE TABLE "posts" (
                "id" SERIAL NOT NULL,
                "authorId" integer NOT NULL,
                "descriptions" text,
                "edited" integer NOT NULL DEFAULT '0',
                "categoryId" integer,
                "createdAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
                "updatedAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
                "deletedAt" TIMESTAMP WITH TIME ZONE,
                CONSTRAINT "PK_2829ac61eff60fcec60d7274b9e" PRIMARY KEY ("id")
            )
        `);
        await queryRunner.query(`
            CREATE TABLE "categories" (
                "id" SERIAL NOT NULL,
                "name" character varying,
                "hasName" boolean NOT NULL DEFAULT false,
                CONSTRAINT "PK_24dbc6126a28ff948da33e97d3b" PRIMARY KEY ("id")
            )
        `);
        await queryRunner.query(`
            ALTER TABLE "post_images"
            ADD CONSTRAINT "FK_92e2382a7f43d4e9350d591fb6a" FOREIGN KEY ("postId") REFERENCES "posts"("id") ON DELETE CASCADE ON UPDATE NO ACTION
        `);
        await queryRunner.query(`
            ALTER TABLE "comments"
            ADD CONSTRAINT "FK_fd8bc091ac882d63a40fca119b4" FOREIGN KEY ("markId") REFERENCES "marks"("id") ON DELETE CASCADE ON UPDATE NO ACTION
        `);
        await queryRunner.query(`
            ALTER TABLE "comments"
            ADD CONSTRAINT "FK_951710a101ae6b6689e860c3eca" FOREIGN KEY ("posterId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE NO ACTION
        `);
        await queryRunner.query(`
            ALTER TABLE "marks"
            ADD CONSTRAINT "FK_973328744c2df20b42300a16843" FOREIGN KEY ("postId") REFERENCES "posts"("id") ON DELETE CASCADE ON UPDATE NO ACTION
        `);
        await queryRunner.query(`
            ALTER TABLE "marks"
            ADD CONSTRAINT "FK_98a49eabf133276ba7490a7f4db" FOREIGN KEY ("posterId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE NO ACTION
        `);
        await queryRunner.query(`
            ALTER TABLE "feels"
            ADD CONSTRAINT "FK_90ce3c09d6fb04e57f11c466c14" FOREIGN KEY ("postId") REFERENCES "posts"("id") ON DELETE CASCADE ON UPDATE NO ACTION
        `);
        await queryRunner.query(`
            ALTER TABLE "feels"
            ADD CONSTRAINT "FK_612c81c910ab680619ec743a2fb" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE NO ACTION
        `);
        await queryRunner.query(`
            ALTER TABLE "posts"
            ADD CONSTRAINT "FK_c5a322ad12a7bf95460c958e80e" FOREIGN KEY ("authorId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE NO ACTION
        `);
        await queryRunner.query(`
            ALTER TABLE "posts"
            ADD CONSTRAINT "FK_168bf21b341e2ae340748e2541d" FOREIGN KEY ("categoryId") REFERENCES "categories"("id") ON DELETE
            SET NULL ON UPDATE NO ACTION
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            ALTER TABLE "posts" DROP CONSTRAINT "FK_168bf21b341e2ae340748e2541d"
        `);
        await queryRunner.query(`
            ALTER TABLE "posts" DROP CONSTRAINT "FK_c5a322ad12a7bf95460c958e80e"
        `);
        await queryRunner.query(`
            ALTER TABLE "feels" DROP CONSTRAINT "FK_612c81c910ab680619ec743a2fb"
        `);
        await queryRunner.query(`
            ALTER TABLE "feels" DROP CONSTRAINT "FK_90ce3c09d6fb04e57f11c466c14"
        `);
        await queryRunner.query(`
            ALTER TABLE "marks" DROP CONSTRAINT "FK_98a49eabf133276ba7490a7f4db"
        `);
        await queryRunner.query(`
            ALTER TABLE "marks" DROP CONSTRAINT "FK_973328744c2df20b42300a16843"
        `);
        await queryRunner.query(`
            ALTER TABLE "comments" DROP CONSTRAINT "FK_951710a101ae6b6689e860c3eca"
        `);
        await queryRunner.query(`
            ALTER TABLE "comments" DROP CONSTRAINT "FK_fd8bc091ac882d63a40fca119b4"
        `);
        await queryRunner.query(`
            ALTER TABLE "post_images" DROP CONSTRAINT "FK_92e2382a7f43d4e9350d591fb6a"
        `);
        await queryRunner.query(`
            DROP TABLE "categories"
        `);
        await queryRunner.query(`
            DROP TABLE "posts"
        `);
        await queryRunner.query(`
            DROP TABLE "feels"
        `);
        await queryRunner.query(`
            DROP TABLE "marks"
        `);
        await queryRunner.query(`
            DROP TABLE "comments"
        `);
        await queryRunner.query(`
            DROP TABLE "post_videos"
        `);
        await queryRunner.query(`
            DROP TABLE "post_images"
        `);
    }
}
