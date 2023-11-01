import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateTableFriendRequests1698857250089 implements MigrationInterface {
    name = 'CreateTableFriendRequests1698857250089';

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            CREATE TABLE "friend_requests" (
                "id" SERIAL NOT NULL,
                "targetId" integer NOT NULL,
                "userId" integer NOT NULL,
                "createdAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
                "updatedAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
                CONSTRAINT "PK_3827ba86ce64ecb4b90c92eeea6" PRIMARY KEY ("id")
            )
        `);
        await queryRunner.query(`
            ALTER TABLE "friend_requests"
            ADD CONSTRAINT "FK_15be34c464426ea3e464cd35d08" FOREIGN KEY ("targetId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE NO ACTION
        `);
        await queryRunner.query(`
            ALTER TABLE "friend_requests"
            ADD CONSTRAINT "FK_a22633834593d9bc5734b80e5aa" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE NO ACTION
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            ALTER TABLE "friend_requests" DROP CONSTRAINT "FK_a22633834593d9bc5734b80e5aa"
        `);
        await queryRunner.query(`
            ALTER TABLE "friend_requests" DROP CONSTRAINT "FK_15be34c464426ea3e464cd35d08"
        `);
        await queryRunner.query(`
            DROP TABLE "friend_requests"
        `);
    }
}
