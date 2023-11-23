import { MigrationInterface, QueryRunner } from "typeorm";

export class UpdateTableFriendRequest1700502641442 implements MigrationInterface {
    name = 'UpdateTableFriendRequest1700502641442'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            ALTER TABLE "friend_requests"
            ADD "read" boolean NOT NULL DEFAULT false
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            ALTER TABLE "friend_requests" DROP COLUMN "read"
        `);
    }

}
