import {
    MigrationInterface, 
    QueryRunner,
    Table,
    TableForeignKey,
} from "typeorm";

export class member1677226446116 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
                name: "projects_members",
                columns: [
                    {
                      name: 'id',
                      type: 'int',
                      isPrimary: true,
                      isGenerated: true,
                      generationStrategy: 'increment',
                    },
                    {
                        name: "member_id",
                        type: "int",
                    },
                    {
                        name: "project_id",
                        type: "int",
                        // isPrimary: true,
                    },
                    {
                        name: "created_at",
                        type: "timestamp",
                        default: "now()",
                        isNullable: true,
                      },
                  ],
              }),
              true,
            )
    
            await queryRunner.createForeignKey(
              "projects_members",
              new TableForeignKey({
                  columnNames: ["project_id"],
                  referencedColumnNames: ["id"],
                  referencedTableName: "projects",
                  onDelete: "CASCADE",
              }),
            )
    
            await queryRunner.createForeignKey(
              "projects_members",
              new TableForeignKey({
                  columnNames: ["member_id"],
                  referencedColumnNames: ["id"],
                  referencedTableName: "members",
                  onDelete: "CASCADE",
              }),
            )
    
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
    }

}
