import { MigrationInterface, QueryRunner } from 'typeorm';

export class UpdateTableMarksCommentsUserId1699712262533 implements MigrationInterface {
    name = 'UpdateTableMarksCommentsUserId1699712262533';

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            ALTER TABLE "comments" DROP CONSTRAINT "FK_951710a101ae6b6689e860c3eca"
        `);
        await queryRunner.query(`
            ALTER TABLE "marks" DROP CONSTRAINT "FK_98a49eabf133276ba7490a7f4db"
        `);
        await queryRunner.query(`
            ALTER TABLE "comments"
                RENAME COLUMN "posterId" TO "userId"
        `);
        await queryRunner.query(`
            ALTER TABLE "marks"
                RENAME COLUMN "posterId" TO "userId"
        `);
        await queryRunner.query(`
            ALTER TABLE "comments"
            ADD CONSTRAINT "FK_7e8d7c49f218ebb14314fdb3749" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE NO ACTION
        `);
        await queryRunner.query(`
            ALTER TABLE "marks"
            ADD CONSTRAINT "FK_e21a0fc27837fcc49166f565478" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE NO ACTION
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            ALTER TABLE "marks" DROP CONSTRAINT "FK_e21a0fc27837fcc49166f565478"
        `);
        await queryRunner.query(`
            ALTER TABLE "comments" DROP CONSTRAINT "FK_7e8d7c49f218ebb14314fdb3749"
        `);
        await queryRunner.query(`
            ALTER TABLE "marks"
                RENAME COLUMN "userId" TO "posterId"
        `);
        await queryRunner.query(`
            ALTER TABLE "comments"
                RENAME COLUMN "userId" TO "posterId"
        `);
        await queryRunner.query(`
            ALTER TABLE "marks"
            ADD CONSTRAINT "FK_98a49eabf133276ba7490a7f4db" FOREIGN KEY ("posterId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE NO ACTION
        `);
        await queryRunner.query(`
            ALTER TABLE "comments"
            ADD CONSTRAINT "FK_951710a101ae6b6689e860c3eca" FOREIGN KEY ("posterId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE NO ACTION
        `);
    }
}
