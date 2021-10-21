import {MigrationInterface, QueryRunner} from "typeorm";

export class Initial1634774662065 implements MigrationInterface {
    name = 'Initial1634774662065'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "niggun" ("id" SERIAL NOT NULL, "title" character varying NOT NULL, "link" character varying NOT NULL, "length" integer NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "UQ_b04a8bf891130da8e48e968bbec" UNIQUE ("title"), CONSTRAINT "PK_ceabd550e05ec2acad44315ef8c" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "user" ("id" SERIAL NOT NULL, "email" text NOT NULL, "password" character varying NOT NULL, "isAdmin" boolean, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "UQ_e12875dfb3b1d92d7d7c5377e22" UNIQUE ("email"), CONSTRAINT "PK_cace4a159ff9f2512dd42373760" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "like" ("userId" integer NOT NULL, "niggunId" integer NOT NULL, CONSTRAINT "PK_562763088951172279c0f1ac4bf" PRIMARY KEY ("userId", "niggunId"))`);
        await queryRunner.query(`ALTER TABLE "like" ADD CONSTRAINT "FK_e8fb739f08d47955a39850fac23" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "like" ADD CONSTRAINT "FK_4d04936c02ff553166b27c4fcc6" FOREIGN KEY ("niggunId") REFERENCES "niggun"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "like" DROP CONSTRAINT "FK_4d04936c02ff553166b27c4fcc6"`);
        await queryRunner.query(`ALTER TABLE "like" DROP CONSTRAINT "FK_e8fb739f08d47955a39850fac23"`);
        await queryRunner.query(`DROP TABLE "like"`);
        await queryRunner.query(`DROP TABLE "user"`);
        await queryRunner.query(`DROP TABLE "niggun"`);
    }

}
