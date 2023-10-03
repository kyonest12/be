import { MigrationInterface, QueryRunner } from 'typeorm';

export class UpdateTableTodos1696327362380 implements MigrationInterface {
    name = 'UpdateTableTodos1696327362380';

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            ALTER TABLE "todos" DROP CONSTRAINT "FK_4583be7753873b4ead956f040e3"
        `);
        await queryRunner.query(`
            ALTER TABLE "todos" DROP COLUMN "userId"
        `);
        await queryRunner.query(`
            ALTER TABLE "todos"
            ADD CONSTRAINT "FK_53511787e1f412d746c4bf223ff" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE NO ACTION
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            ALTER TABLE "todos" DROP CONSTRAINT "FK_53511787e1f412d746c4bf223ff"
        `);
        await queryRunner.query(`
            ALTER TABLE "todos"
            ADD "userId" integer
        `);
        await queryRunner.query(`
            ALTER TABLE "todos"
            ADD CONSTRAINT "FK_4583be7753873b4ead956f040e3" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE NO ACTION
        `);
    }
}
