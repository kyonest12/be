import { MigrationInterface, QueryRunner } from 'typeorm';

export class UpdateTableNotificationsAddFeel1700675099524 implements MigrationInterface {
    name = 'UpdateTableNotificationsAddFeel1700675099524';

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            ALTER TABLE "notifications"
            ADD "feelId" integer
        `);
        await queryRunner.query(`
            ALTER TABLE "notifications"
            ADD CONSTRAINT "FK_2e29e26097006a9f7fc19cfdd3b" FOREIGN KEY ("feelId") REFERENCES "feels"("id") ON DELETE CASCADE ON UPDATE NO ACTION
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            ALTER TABLE "notifications" DROP CONSTRAINT "FK_2e29e26097006a9f7fc19cfdd3b"
        `);
        await queryRunner.query(`
            ALTER TABLE "notifications" DROP COLUMN "feelId"
        `);
    }
}
