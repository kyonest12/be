import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateTableFriends1698857042092 implements MigrationInterface {
    name = 'CreateTableFriends1698857042092';

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            CREATE TABLE "friends" (
                "id" SERIAL NOT NULL,
                "friendId" integer NOT NULL,
                "userId" integer NOT NULL,
                "createdAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
                "updatedAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
                CONSTRAINT "PK_65e1b06a9f379ee5255054021e1" PRIMARY KEY ("id")
            )
        `);
        await queryRunner.query(`
            ALTER TABLE "friends"
            ADD CONSTRAINT "FK_867f9b37dcc79035fa20e8ffe5e" FOREIGN KEY ("friendId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE NO ACTION
        `);
        await queryRunner.query(`
            ALTER TABLE "friends"
            ADD CONSTRAINT "FK_0c4c4b18d8a52c580213a40c084" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE NO ACTION
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            ALTER TABLE "friends" DROP CONSTRAINT "FK_0c4c4b18d8a52c580213a40c084"
        `);
        await queryRunner.query(`
            ALTER TABLE "friends" DROP CONSTRAINT "FK_867f9b37dcc79035fa20e8ffe5e"
        `);
        await queryRunner.query(`
            DROP TABLE "friends"
        `);
    }
}
