import { MigrationInterface, QueryRunner } from "typeorm";

export class UserTable1753247946073 implements MigrationInterface {
    name = 'UserTable1753247946073'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "user" ("id" SERIAL NOT NULL, "full_name" character varying NOT NULL, "email" character varying NOT NULL, "password" character varying NOT NULL, "address_line_1" character varying, "address_line_2" character varying, "phone_number" character varying, "city" character varying, "state" character varying, "country" character varying, "nok_name" character varying, "nok_phone_number" character varying, CONSTRAINT "UQ_e12875dfb3b1d92d7d7c5377e22" UNIQUE ("email"), CONSTRAINT "PK_cace4a159ff9f2512dd42373760" PRIMARY KEY ("id"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "user"`);
    }

}
