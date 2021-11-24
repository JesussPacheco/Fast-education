import {MigrationInterface, QueryRunner} from "typeorm";

export class InitialSchema1637796584488 implements MigrationInterface {
    name = 'InitialSchema1637796584488'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`fast-education\`.\`users\` ADD \`speciality\` varchar(11) NULL`);
        await queryRunner.query(`ALTER TABLE \`fast-education\`.\`transactions\` CHANGE \`status\` \`status\` tinyint(2) UNSIGNED NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`fast-education\`.\`transactions\` CHANGE \`status\` \`status\` tinyint UNSIGNED NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`fast-education\`.\`users\` DROP COLUMN \`speciality\``);
    }

}
