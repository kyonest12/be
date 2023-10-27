import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateTableFeelsMarksComments1697718416677 implements MigrationInterface {
    name = 'CreateTableFeelsMarksComments1697718416677';

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            CREATE TABLE "comments" (
                "id" SERIAL NOT NULL,
                "mark_id" integer NOT NULL,
                "content" text NOT NULL,
                "poster_id" integer NOT NULL,
                CONSTRAINT "PK_8bf68bc960f2b69e818bdb90dcb" PRIMARY KEY ("id")
            )
        `);
        await queryRunner.query(`
            CREATE TABLE "marks" (
                "id" SERIAL NOT NULL,
                "post_id" integer NOT NULL,
                "mark_content" text NOT NULL,
                "type_of_mark" smallint NOT NULL,
                "poster_id" integer NOT NULL,
                CONSTRAINT "PK_051deeb008f7449216d568872c6" PRIMARY KEY ("id")
            )
        `);
        await queryRunner.query(`
            CREATE TABLE "feels" (
                "id" SERIAL NOT NULL,
                "post_id" integer NOT NULL,
                "type" smallint NOT NULL,
                "user_id" integer NOT NULL,
                CONSTRAINT "PK_332cab1304b78588d7656d2c37b" PRIMARY KEY ("id")
            )
        `);
        await queryRunner.query(`
            ALTER TABLE "comments"
            ADD CONSTRAINT "FK_d2892a6c5574a38deca090d5dc4" FOREIGN KEY ("mark_id") REFERENCES "marks"("id") ON DELETE CASCADE ON UPDATE NO ACTION
        `);
        await queryRunner.query(`
            ALTER TABLE "comments"
            ADD CONSTRAINT "FK_ae47ceabbff7f19bac759a78621" FOREIGN KEY ("poster_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE NO ACTION
        `);
        await queryRunner.query(`
            ALTER TABLE "marks"
            ADD CONSTRAINT "FK_37712977057231bf0392168ef53" FOREIGN KEY ("post_id") REFERENCES "posts"("id") ON DELETE CASCADE ON UPDATE NO ACTION
        `);
        await queryRunner.query(`
            ALTER TABLE "marks"
            ADD CONSTRAINT "FK_a910bfd778ef4114b483eee37cb" FOREIGN KEY ("poster_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE NO ACTION
        `);
        await queryRunner.query(`
            ALTER TABLE "feels"
            ADD CONSTRAINT "FK_d22181d973ca470b4e5eb68a32c" FOREIGN KEY ("post_id") REFERENCES "posts"("id") ON DELETE CASCADE ON UPDATE NO ACTION
        `);
        await queryRunner.query(`
            ALTER TABLE "feels"
            ADD CONSTRAINT "FK_cfea3fb5a8aed497ffbaaa8cf43" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE NO ACTION
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            ALTER TABLE "feels" DROP CONSTRAINT "FK_cfea3fb5a8aed497ffbaaa8cf43"
        `);
        await queryRunner.query(`
            ALTER TABLE "feels" DROP CONSTRAINT "FK_d22181d973ca470b4e5eb68a32c"
        `);
        await queryRunner.query(`
            ALTER TABLE "marks" DROP CONSTRAINT "FK_a910bfd778ef4114b483eee37cb"
        `);
        await queryRunner.query(`
            ALTER TABLE "marks" DROP CONSTRAINT "FK_37712977057231bf0392168ef53"
        `);
        await queryRunner.query(`
            ALTER TABLE "comments" DROP CONSTRAINT "FK_ae47ceabbff7f19bac759a78621"
        `);
        await queryRunner.query(`
            ALTER TABLE "comments" DROP CONSTRAINT "FK_d2892a6c5574a38deca090d5dc4"
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
    }
}
