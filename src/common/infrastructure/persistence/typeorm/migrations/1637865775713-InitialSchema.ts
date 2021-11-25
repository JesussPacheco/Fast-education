import {MigrationInterface, QueryRunner} from "typeorm";

export class InitialSchema1637865775713 implements MigrationInterface {
    name = 'InitialSchema1637865775713'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`fast-education\`.\`subscriptions\` CHANGE \`status\` \`status\` tinyint(2) UNSIGNED NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`fast-education\`.\`subscriptions\` DROP COLUMN \`membership\``);
        await queryRunner.query(`ALTER TABLE \`fast-education\`.\`subscriptions\` ADD \`membership\` varchar(10) NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`fast-education\`.\`subscriptions\` DROP COLUMN \`membership\``);
        await queryRunner.query(`ALTER TABLE \`fast-education\`.\`subscriptions\` ADD \`membership\` varchar(1) NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`fast-education\`.\`subscriptions\` CHANGE \`status\` \`status\` tinyint UNSIGNED NOT NULL`);
    }

}
