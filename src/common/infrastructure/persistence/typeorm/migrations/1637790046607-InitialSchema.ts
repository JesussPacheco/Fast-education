import {MigrationInterface, QueryRunner} from "typeorm";

export class InitialSchema1637790046607 implements MigrationInterface {
    name = 'InitialSchema1637790046607'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP INDEX \`UQ_users_company_name\` ON \`fast-education\`.\`users\``);
        await queryRunner.query(`ALTER TABLE \`fast-education\`.\`users\` CHANGE \`company_name\` \`teacher_name\` varchar(150) NULL`);
        await queryRunner.query(`ALTER TABLE \`fast-education\`.\`transactions\` CHANGE \`status\` \`status\` tinyint(2) UNSIGNED NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`fast-education\`.\`users\` ADD UNIQUE INDEX \`IDX_82fe15d5db8c875f0598c22621\` (\`teacher_name\`)`);
        await queryRunner.query(`CREATE UNIQUE INDEX \`UQ_users_teacher_name\` ON \`fast-education\`.\`users\` (\`teacher_name\`)`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP INDEX \`UQ_users_teacher_name\` ON \`fast-education\`.\`users\``);
        await queryRunner.query(`ALTER TABLE \`fast-education\`.\`users\` DROP INDEX \`IDX_82fe15d5db8c875f0598c22621\``);
        await queryRunner.query(`ALTER TABLE \`fast-education\`.\`transactions\` CHANGE \`status\` \`status\` tinyint UNSIGNED NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`fast-education\`.\`users\` CHANGE \`teacher_name\` \`company_name\` varchar(150) NULL`);
        await queryRunner.query(`CREATE UNIQUE INDEX \`UQ_users_company_name\` ON \`fast-education\`.\`users\` (\`company_name\`)`);
    }

}
