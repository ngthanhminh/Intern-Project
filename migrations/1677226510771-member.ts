import {
    MigrationInterface, 
    QueryRunner,
    Table,
    TableForeignKey,
} from "typeorm";

export class member1677226510771 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        
    await queryRunner.createTable(
        new Table({
            name: "tickets",
            columns: [
                {
                    name: "id",
                    type: "int",
                    isPrimary: true,
                    isGenerated: true,
                    generationStrategy: 'increment',
                },
                {
                    name: 'code',
                    type: 'int',
                    isUnique: true,
                },
                {
                    name: "title",
                    type: "nvarchar",
                },
                {
                    name: "content",
                    type: "text",
                },
                {
                    name: "deadline",
                    type: "datetime",
                },
                {
                    name: "project_member_id",
                    type: "int",
                    isNullable: true,
                },
                {
                    name: "project_id",
                    type: "int",
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

        await queryRunner.createForeignKey(
            "tickets",
            new TableForeignKey({
                columnNames: ["project_member_id"],
                referencedColumnNames: ["id"],
                referencedTableName: "projects_members",
                onDelete: "CASCADE",
            }),
          )
    
          await queryRunner.createForeignKey(
            "tickets",
            new TableForeignKey({
                columnNames: ["project_id"],
                referencedColumnNames: ["id"],
                referencedTableName: "projects",
                onDelete: "CASCADE",
            }),
          )
  
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
    }

}
