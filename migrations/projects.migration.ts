import {
    MigrationInterface, 
    QueryRunner,
    Table,
} from "typeorm";

export class member1677226326059 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
                name: "projects",
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
                        type: "varchar",
                        isUnique: true,
                    },
                    {
                        name: "start_date",
                        type: "timestamp",
                        default: "now()",
                        isNullable: true,
                    },
                    {
                        name: "end_date",
                        type: "timestamp",
                        isNullable: true,
                    },
                    {
                        name: "project_type",
                        type: "varchar",
                    },
                    {
                        name: "expected_profit",
                        type: "bigint",
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
                  ],
              }),
              true,
          )
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.clearTable('projects');
        await queryRunner.dropTable('projects', true);
    }
}
