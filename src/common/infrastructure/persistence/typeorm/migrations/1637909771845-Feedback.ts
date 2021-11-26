import {MigrationInterface, QueryRunner} from "typeorm";

export class Feedback1637909771845 implements MigrationInterface {
    name = 'Feedback1637909771845'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE \`fast-education\`.\`Feedbacks\` (\`id\` bigint UNSIGNED NOT NULL AUTO_INCREMENT, \`name\` varchar(400) NOT NULL, \`teacher_id\` bigint NOT NULL, \`student_id\` bigint NOT NULL, \`route_id\` bigint NOT NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`ALTER TABLE \`fast-education\`.\`subscriptions\` CHANGE \`status\` \`status\` tinyint(2) UNSIGNED NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`fast-education\`.\`subscriptions\` CHANGE \`status\` \`status\` tinyint UNSIGNED NOT NULL`);
        await queryRunner.query(`DROP TABLE \`fast-education\`.\`Feedbacks\``);
    }

}
