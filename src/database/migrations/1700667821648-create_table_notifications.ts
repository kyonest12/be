import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateTableNotifications1700667821648 implements MigrationInterface {
    name = 'CreateTableNotifications1700667821648';

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            CREATE TABLE "notifications" (
                "id" SERIAL NOT NULL,
                "targetId" integer,
                "postId" integer,
                "markId" integer,
                "type" smallint NOT NULL,
                "read" boolean NOT NULL DEFAULT false,
                "action" boolean NOT NULL DEFAULT false,
                "userId" integer NOT NULL,
                CONSTRAINT "PK_6a72c3c0f683f6462415e653c3a" PRIMARY KEY ("id")
            )
        `);
        await queryRunner.query(`
            ALTER TABLE "notifications"
            ADD CONSTRAINT "FK_692a909ee0fa9383e7859f9b406" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE NO ACTION
        `);
        await queryRunner.query(`
            ALTER TABLE "notifications"
            ADD CONSTRAINT "FK_2148e43934b78b21655fe441e17" FOREIGN KEY ("targetId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE NO ACTION
        `);
        await queryRunner.query(`
            ALTER TABLE "notifications"
            ADD CONSTRAINT "FK_93c464aaf70fb0720dc500e93c8" FOREIGN KEY ("postId") REFERENCES "posts"("id") ON DELETE CASCADE ON UPDATE NO ACTION
        `);
        await queryRunner.query(`
            ALTER TABLE "notifications"
            ADD CONSTRAINT "FK_b3a56eab6bcdb459b2066fa4d48" FOREIGN KEY ("markId") REFERENCES "marks"("id") ON DELETE CASCADE ON UPDATE NO ACTION
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            ALTER TABLE "notifications" DROP CONSTRAINT "FK_b3a56eab6bcdb459b2066fa4d48"
        `);
        await queryRunner.query(`
            ALTER TABLE "notifications" DROP CONSTRAINT "FK_93c464aaf70fb0720dc500e93c8"
        `);
        await queryRunner.query(`
            ALTER TABLE "notifications" DROP CONSTRAINT "FK_2148e43934b78b21655fe441e17"
        `);
        await queryRunner.query(`
            ALTER TABLE "notifications" DROP CONSTRAINT "FK_692a909ee0fa9383e7859f9b406"
        `);
        await queryRunner.query(`
            DROP TABLE "notifications"
        `);
    }
}
