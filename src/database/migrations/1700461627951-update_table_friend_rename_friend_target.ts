import { MigrationInterface, QueryRunner } from 'typeorm';

export class UpdateTableFriendRenameFriendTarget1700461627951 implements MigrationInterface {
    name = 'UpdateTableFriendRenameFriendTarget1700461627951';

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            ALTER TABLE "friends" DROP CONSTRAINT "FK_867f9b37dcc79035fa20e8ffe5e"
        `);
        await queryRunner.query(`
            ALTER TABLE "friends"
                RENAME COLUMN "friendId" TO "targetId"
        `);
        await queryRunner.query(`
            ALTER TABLE "friends"
            ADD CONSTRAINT "FK_fb7070d5a1a1d0c893373f1032d" FOREIGN KEY ("targetId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE NO ACTION
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            ALTER TABLE "friends" DROP CONSTRAINT "FK_fb7070d5a1a1d0c893373f1032d"
        `);
        await queryRunner.query(`
            ALTER TABLE "friends"
                RENAME COLUMN "targetId" TO "friendId"
        `);
        await queryRunner.query(`
            ALTER TABLE "friends"
            ADD CONSTRAINT "FK_867f9b37dcc79035fa20e8ffe5e" FOREIGN KEY ("friendId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE NO ACTION
        `);
    }
}
