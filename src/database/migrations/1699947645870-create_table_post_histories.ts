import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateTablePostHistories1699947645870 implements MigrationInterface {
    name = 'CreateTablePostHistories1699947645870';

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            CREATE TABLE "post_histories" (
                "id" SERIAL NOT NULL,
                "postId" integer NOT NULL,
                "oldPostId" integer NOT NULL,
                CONSTRAINT "PK_53331ab47e5509bc5d12329e63c" PRIMARY KEY ("id")
            )
        `);
        await queryRunner.query(`
            ALTER TABLE "post_histories"
            ADD CONSTRAINT "FK_c1e05970cdc6ea4d8eb34e450f6" FOREIGN KEY ("postId") REFERENCES "posts"("id") ON DELETE CASCADE ON UPDATE NO ACTION
        `);
        await queryRunner.query(`
            ALTER TABLE "post_histories"
            ADD CONSTRAINT "FK_22f33cde83a0b8e171a975527fe" FOREIGN KEY ("oldPostId") REFERENCES "posts"("id") ON DELETE CASCADE ON UPDATE NO ACTION
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            ALTER TABLE "post_histories" DROP CONSTRAINT "FK_22f33cde83a0b8e171a975527fe"
        `);
        await queryRunner.query(`
            ALTER TABLE "post_histories" DROP CONSTRAINT "FK_c1e05970cdc6ea4d8eb34e450f6"
        `);
        await queryRunner.query(`
            DROP TABLE "post_histories"
        `);
    }
}
