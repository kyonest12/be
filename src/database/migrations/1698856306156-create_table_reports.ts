import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateTableReports1698856306156 implements MigrationInterface {
    name = 'CreateTableReports1698856306156';

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            CREATE TABLE "reports" (
                "id" SERIAL NOT NULL,
                "userId" integer NOT NULL,
                "postId" integer NOT NULL,
                "subject" character varying NOT NULL,
                "details" text NOT NULL,
                "createdAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
                "updatedAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
                CONSTRAINT "PK_d9013193989303580053c0b5ef6" PRIMARY KEY ("id")
            )
        `);
        await queryRunner.query(`
            ALTER TABLE "reports"
            ADD CONSTRAINT "FK_bed415cd29716cd707e9cb3c09c" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE NO ACTION
        `);
        await queryRunner.query(`
            ALTER TABLE "reports"
            ADD CONSTRAINT "FK_6bebfa3fc68a35f5af3f9883c4e" FOREIGN KEY ("postId") REFERENCES "posts"("id") ON DELETE CASCADE ON UPDATE NO ACTION
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            ALTER TABLE "reports" DROP CONSTRAINT "FK_6bebfa3fc68a35f5af3f9883c4e"
        `);
        await queryRunner.query(`
            ALTER TABLE "reports" DROP CONSTRAINT "FK_bed415cd29716cd707e9cb3c09c"
        `);
        await queryRunner.query(`
            DROP TABLE "reports"
        `);
    }
}
