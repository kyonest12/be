import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateTableBlocks1698857334906 implements MigrationInterface {
    name = 'CreateTableBlocks1698857334906';

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            CREATE TABLE "blocks" (
                "id" SERIAL NOT NULL,
                "targetId" integer NOT NULL,
                "userId" integer NOT NULL,
                "createdAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
                "updatedAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
                CONSTRAINT "PK_8244fa1495c4e9222a01059244b" PRIMARY KEY ("id")
            )
        `);
        await queryRunner.query(`
            ALTER TABLE "blocks"
            ADD CONSTRAINT "FK_f908fcd508004eaaeee5218d0b1" FOREIGN KEY ("targetId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE NO ACTION
        `);
        await queryRunner.query(`
            ALTER TABLE "blocks"
            ADD CONSTRAINT "FK_57c16f623e673ea4348992b0ffa" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE NO ACTION
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            ALTER TABLE "blocks" DROP CONSTRAINT "FK_57c16f623e673ea4348992b0ffa"
        `);
        await queryRunner.query(`
            ALTER TABLE "blocks" DROP CONSTRAINT "FK_f908fcd508004eaaeee5218d0b1"
        `);
        await queryRunner.query(`
            DROP TABLE "blocks"
        `);
    }
}
