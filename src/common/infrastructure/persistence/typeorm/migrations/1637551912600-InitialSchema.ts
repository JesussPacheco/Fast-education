import {MigrationInterface, QueryRunner} from "typeorm";

export class InitialSchema1637551912600 implements MigrationInterface {
    name = 'InitialSchema1637551912600'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE \`banking-ddd-nest\`.\`routes\` (\`id\` bigint UNSIGNED NOT NULL AUTO_INCREMENT, \`name\` varchar(75) NOT NULL, \`university_id\` varchar(8) NOT NULL, \`grade_id\` varchar(8) NOT NULL, UNIQUE INDEX \`UQ_routes_id\` (\`id\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`ALTER TABLE \`banking-ddd-nest\`.\`transactions\` CHANGE \`status\` \`status\` tinyint(2) UNSIGNED NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`banking-ddd-nest\`.\`transactions\` CHANGE \`status\` \`status\` tinyint UNSIGNED NOT NULL`);
        await queryRunner.query(`DROP INDEX \`UQ_routes_id\` ON \`banking-ddd-nest\`.\`routes\``);
        await queryRunner.query(`DROP TABLE \`banking-ddd-nest\`.\`routes\``);
    }

}
