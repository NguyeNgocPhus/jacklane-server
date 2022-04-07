import {MigrationInterface, QueryRunner} from "typeorm";

export class addUser1648480143071 implements MigrationInterface {
    name = 'addUser1648480143071'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "user_read_model" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying NOT NULL, "email" character varying NOT NULL, CONSTRAINT "PK_79d93aeee11452d444ad79a1af6" PRIMARY KEY ("id"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "user_read_model"`);
    }

}
