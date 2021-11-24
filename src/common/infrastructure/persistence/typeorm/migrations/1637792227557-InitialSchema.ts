import {MigrationInterface, QueryRunner} from "typeorm";

export class InitialSchema1637792227557 implements MigrationInterface {
    name = 'InitialSchema1637792227557'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP INDEX \`IDX_82fe15d5db8c875f0598c22621\` ON \`fast-education\`.\`users\``);
        await queryRunner.query(`ALTER TABLE \`fast-education\`.\`transactions\` CHANGE \`status\` \`status\` tinyint(2) UNSIGNED NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`fast-education\`.\`transactions\` CHANGE \`status\` \`status\` tinyint UNSIGNED NOT NULL`);
        await queryRunner.query(`CREATE UNIQUE INDEX \`IDX_82fe15d5db8c875f0598c22621\` ON \`fast-education\`.\`users\` (\`teacher_name\`)`);
    }

}
