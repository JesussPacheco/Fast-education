import {MigrationInterface, QueryRunner} from "typeorm";

export class InitialSchema1637691257428 implements MigrationInterface {
    name = 'InitialSchema1637691257428'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE \`banking-ddd-nest\`.\`accounts\` (\`id\` bigint UNSIGNED NOT NULL AUTO_INCREMENT, \`number\` varchar(15) NOT NULL, \`balance\` decimal(10,2) NULL, \`currency\` varchar(3) NULL, \`student_id\` bigint UNSIGNED NOT NULL, \`created_at\` datetime NULL, \`created_by\` bigint NULL, \`updated_at\` datetime NULL, \`updated_by\` bigint NULL, UNIQUE INDEX \`UQ_accounts_number\` (\`number\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`banking-ddd-nest\`.\`routes\` (\`id\` bigint UNSIGNED NOT NULL AUTO_INCREMENT, \`name\` varchar(75) NOT NULL, \`university_id\` varchar(8) NOT NULL, \`grade_id\` varchar(8) NOT NULL, UNIQUE INDEX \`UQ_routes_id\` (\`id\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`banking-ddd-nest\`.\`students\` (\`id\` bigint UNSIGNED NOT NULL AUTO_INCREMENT, \`type\` enum ('C', 'P') NOT NULL DEFAULT 'C', \`created_at\` datetime NULL, \`created_by\` bigint NULL, \`updated_at\` datetime NULL, \`updated_by\` bigint NULL, \`company_name\` varchar(150) NULL, \`ruc\` varchar(11) NULL, \`first_name\` varchar(75) NULL, \`last_name\` varchar(75) NULL, \`dni\` varchar(8) NULL, UNIQUE INDEX \`UQ_students_ruc\` (\`ruc\`), UNIQUE INDEX \`UQ_students_company_name\` (\`company_name\`), UNIQUE INDEX \`UQ_students_dni\` (\`dni\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`banking-ddd-nest\`.\`transactions\` (\`id\` bigint UNSIGNED NOT NULL AUTO_INCREMENT, \`type\` char(1) NOT NULL, \`status\` tinyint(2) UNSIGNED NOT NULL, \`account_id_from\` bigint UNSIGNED NOT NULL, \`account_id_to\` bigint UNSIGNED NULL, \`amount\` decimal(10,2) NULL, \`currency\` varchar(3) NULL, \`created_at\` datetime NULL, \`created_by\` bigint NULL, \`updated_at\` datetime NULL, \`updated_by\` bigint NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE \`banking-ddd-nest\`.\`transactions\``);
        await queryRunner.query(`DROP INDEX \`UQ_students_dni\` ON \`banking-ddd-nest\`.\`students\``);
        await queryRunner.query(`DROP INDEX \`UQ_students_company_name\` ON \`banking-ddd-nest\`.\`students\``);
        await queryRunner.query(`DROP INDEX \`UQ_students_ruc\` ON \`banking-ddd-nest\`.\`students\``);
        await queryRunner.query(`DROP TABLE \`banking-ddd-nest\`.\`students\``);
        await queryRunner.query(`DROP INDEX \`UQ_routes_id\` ON \`banking-ddd-nest\`.\`routes\``);
        await queryRunner.query(`DROP TABLE \`banking-ddd-nest\`.\`routes\``);
        await queryRunner.query(`DROP INDEX \`UQ_accounts_number\` ON \`banking-ddd-nest\`.\`accounts\``);
        await queryRunner.query(`DROP TABLE \`banking-ddd-nest\`.\`accounts\``);
    }

}
