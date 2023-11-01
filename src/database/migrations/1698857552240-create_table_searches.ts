import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateTableSearches1698857552240 implements MigrationInterface {
    name = 'CreateTableSearches1698857552240';

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            CREATE TABLE "searches" (
                "id" SERIAL NOT NULL,
                "userId" integer NOT NULL,
                "keyword" character varying NOT NULL,
                "createdAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
                "updatedAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
                CONSTRAINT "PK_60a4e082658af4c8834c23f6fad" PRIMARY KEY ("id")
            )
        `);
        await queryRunner.query(`
            ALTER TABLE "searches"
            ADD CONSTRAINT "FK_5af029bdc8c4f0bfd9e286933b5" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE NO ACTION
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            ALTER TABLE "searches" DROP CONSTRAINT "FK_5af029bdc8c4f0bfd9e286933b5"
        `);
        await queryRunner.query(`
            DROP TABLE "searches"
        `);
    }
}
