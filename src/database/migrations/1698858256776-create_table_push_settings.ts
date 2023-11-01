import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateTablePushSettings1698858256776 implements MigrationInterface {
    name = 'CreateTablePushSettings1698858256776';

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            CREATE TABLE "push_settings" (
                "id" SERIAL NOT NULL,
                "userId" integer NOT NULL,
                "likeComment" boolean NOT NULL DEFAULT true,
                "fromFriends" boolean NOT NULL DEFAULT true,
                "friendRequests" boolean NOT NULL DEFAULT true,
                "suggestedFriends" boolean NOT NULL DEFAULT true,
                "birthdays" boolean NOT NULL DEFAULT true,
                "videos" boolean NOT NULL DEFAULT true,
                "reports" boolean NOT NULL DEFAULT true,
                "soundOn" boolean NOT NULL DEFAULT true,
                "notificationOn" boolean NOT NULL DEFAULT true,
                "vibrationOn" boolean NOT NULL DEFAULT true,
                "ledOn" boolean NOT NULL DEFAULT true,
                CONSTRAINT "REL_c258fe574c6b20e341ea1eabb0" UNIQUE ("userId"),
                CONSTRAINT "PK_481d8e0b5fbf4baa85878912f83" PRIMARY KEY ("id")
            )
        `);
        await queryRunner.query(`
            ALTER TABLE "push_settings"
            ADD CONSTRAINT "FK_c258fe574c6b20e341ea1eabb05" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE NO ACTION
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            ALTER TABLE "push_settings" DROP CONSTRAINT "FK_c258fe574c6b20e341ea1eabb05"
        `);
        await queryRunner.query(`
            DROP TABLE "push_settings"
        `);
    }
}
