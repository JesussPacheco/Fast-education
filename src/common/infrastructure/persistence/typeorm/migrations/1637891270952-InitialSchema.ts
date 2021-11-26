import {MigrationInterface, QueryRunner} from "typeorm";

export class InitialSchema1637891270952 implements MigrationInterface {
    name = 'InitialSchema1637891270952'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE \`fast-education\`.\`accounts\` (\`id\` bigint UNSIGNED NOT NULL AUTO_INCREMENT, \`number\` varchar(15) NOT NULL, \`balance\` decimal(10,2) NULL, \`currency\` varchar(3) NULL, \`user_id\` bigint UNSIGNED NOT NULL, \`created_at\` datetime NULL, \`created_by\` bigint NULL, \`updated_at\` datetime NULL, \`updated_by\` bigint NULL, UNIQUE INDEX \`UQ_accounts_number\` (\`number\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`fast-education\`.\`routes\` (\`id\` bigint UNSIGNED NOT NULL AUTO_INCREMENT, \`name\` varchar(75) NOT NULL, \`university_id\` varchar(8) NOT NULL, \`grade_id\` varchar(8) NOT NULL, UNIQUE INDEX \`UQ_routes_id\` (\`id\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`fast-education\`.\`subscriptions\` (\`id\` bigint UNSIGNED NOT NULL AUTO_INCREMENT, \`status\` tinyint(2) UNSIGNED NOT NULL, \`membership\` varchar(10) NOT NULL, \`account_id_from\` bigint UNSIGNED NOT NULL, \`amount\` decimal(10,2) NULL, \`currency\` varchar(3) NULL, \`route_id\` bigint UNSIGNED NOT NULL, \`created_at\` datetime NULL, \`created_by\` bigint NULL, \`updated_at\` datetime NULL, \`updated_by\` bigint NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`fast-education\`.\`users\` (\`id\` bigint UNSIGNED NOT NULL AUTO_INCREMENT, \`type\` enum ('T', 'S') NOT NULL DEFAULT 'S', \`created_at\` datetime NULL, \`created_by\` bigint NULL, \`updated_at\` datetime NULL, \`updated_by\` bigint NULL, \`first_name\` varchar(75) NULL, \`last_name\` varchar(75) NULL, \`dni\` varchar(8) NULL, \`teacher_name\` varchar(150) NULL, \`speciality\` varchar(11) NULL, UNIQUE INDEX \`UQ_users_dni\` (\`dni\`), UNIQUE INDEX \`UQ_users_teacher_name\` (\`teacher_name\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP INDEX \`UQ_users_teacher_name\` ON \`fast-education\`.\`users\``);
        await queryRunner.query(`DROP INDEX \`UQ_users_dni\` ON \`fast-education\`.\`users\``);
        await queryRunner.query(`DROP TABLE \`fast-education\`.\`users\``);
        await queryRunner.query(`DROP TABLE \`fast-education\`.\`subscriptions\``);
        await queryRunner.query(`DROP INDEX \`UQ_routes_id\` ON \`fast-education\`.\`routes\``);
        await queryRunner.query(`DROP TABLE \`fast-education\`.\`routes\``);
        await queryRunner.query(`DROP INDEX \`UQ_accounts_number\` ON \`fast-education\`.\`accounts\``);
        await queryRunner.query(`DROP TABLE \`fast-education\`.\`accounts\``);
    }

}
