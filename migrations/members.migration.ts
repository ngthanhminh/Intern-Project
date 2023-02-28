import {
    MigrationInterface, 
    QueryRunner,
    Table,
} from "typeorm";

export class member1677226238676 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
              name: "members",
              columns: [
                {
                  name: "id",
                  type: "int", 
                  isPrimary: true,
                  isGenerated: true,
                  generationStrategy: 'increment',
                },
                {
                  name: "name", 
                  type: "nvarchar",
                }, 
                {
                  name: "username",
                  type: "varchar",
                  isUnique: true,
                },
                {
                  name: "password",
                  type: "varchar",
                },
                {
                  name: "avatar",
                  type: "varchar",
                  default: null,
                  isNullable: true,
                }, 
                {
                  name: "created_at",
                  type: "timestamp",
                  default: "now()",
                },
                {
                  name: "updated_at",
                  type: "timestamp",
                  default: "now()",
                },
                {
                  name: "deleted_at",
                  type: "timestamp",
                  // default: "now()",
                  isNullable: true,
                },
              ]
            }),
            true,
          )
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.clearTable('members');
        await queryRunner.dropTable('members', true);
    }

}
