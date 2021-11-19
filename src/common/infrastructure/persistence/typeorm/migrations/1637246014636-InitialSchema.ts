import {MigrationInterface, QueryRunner} from "typeorm";

export class InitialSchema1637246014636 implements MigrationInterface {
    name = 'InitialSchema1637246014636'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE \`banking-ddd-nest\`.\`accounts\` (\`id\` bigint UNSIGNED NOT NULL AUTO_INCREMENT, \`number\` varchar(15) NOT NULL, \`balance\` decimal(10,2) NULL, \`currency\` varchar(3) NULL, \`customer_id\` bigint UNSIGNED NOT NULL, \`created_at\` datetime NULL, \`created_by\` bigint NULL, \`updated_at\` datetime NULL, \`updated_by\` bigint NULL, UNIQUE INDEX \`UQ_accounts_number\` (\`number\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`banking-ddd-nest\`.\`customers\` (\`id\` bigint UNSIGNED NOT NULL AUTO_INCREMENT, \`type\` enum ('C', 'P') NOT NULL DEFAULT 'C', \`created_at\` datetime NULL, \`created_by\` bigint NULL, \`updated_at\` datetime NULL, \`updated_by\` bigint NULL, \`company_name\` varchar(150) NULL, \`ruc\` varchar(11) NULL, \`first_name\` varchar(75) NULL, \`last_name\` varchar(75) NULL, \`dni\` varchar(8) NULL, UNIQUE INDEX \`UQ_customers_ruc\` (\`ruc\`), UNIQUE INDEX \`UQ_customers_company_name\` (\`company_name\`), UNIQUE INDEX \`UQ_customers_dni\` (\`dni\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`banking-ddd-nest\`.\`transactions\` (\`id\` bigint UNSIGNED NOT NULL AUTO_INCREMENT, \`type\` char(1) NOT NULL, \`status\` tinyint(2) UNSIGNED NOT NULL, \`account_id_from\` bigint UNSIGNED NOT NULL, \`account_id_to\` bigint UNSIGNED NULL, \`amount\` decimal(10,2) NULL, \`currency\` varchar(3) NULL, \`created_at\` datetime NULL, \`created_by\` bigint NULL, \`updated_at\` datetime NULL, \`updated_by\` bigint NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE \`banking-ddd-nest\`.\`transactions\``);
        await queryRunner.query(`DROP INDEX \`UQ_customers_dni\` ON \`banking-ddd-nest\`.\`customers\``);
        await queryRunner.query(`DROP INDEX \`UQ_customers_company_name\` ON \`banking-ddd-nest\`.\`customers\``);
        await queryRunner.query(`DROP INDEX \`UQ_customers_ruc\` ON \`banking-ddd-nest\`.\`customers\``);
        await queryRunner.query(`DROP TABLE \`banking-ddd-nest\`.\`customers\``);
        await queryRunner.query(`DROP INDEX \`UQ_accounts_number\` ON \`banking-ddd-nest\`.\`accounts\``);
        await queryRunner.query(`DROP TABLE \`banking-ddd-nest\`.\`accounts\``);
    }

}
