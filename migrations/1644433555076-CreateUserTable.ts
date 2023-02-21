import { 
  MigrationInterface, 
  QueryRunner, 
  Table,
  TableIndex,
  TableForeignKey,
} from 'typeorm';

export class CreateUserTable1644433555076 implements MigrationInterface {
  name = 'CreateUserTable1644433555076';

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
                type: "enum('LABOUR', 'FIX_PRICE', 'MAINTAIN')",
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
                  name: "assign",
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

      await queryRunner.createTable(
        new Table({
            name: "joins",
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
                    name: "join_date",
                    type: "timestamp",
                },
              ],
          }),
          true,
        )

        await queryRunner.createForeignKey(
          "joins",
          new TableForeignKey({
              columnNames: ["project_id"],
              referencedColumnNames: ["id"],
              referencedTableName: "projects",
              onDelete: "CASCADE",
          }),
        )

        await queryRunner.createForeignKey(
          "joins",
          new TableForeignKey({
              columnNames: ["member_id"],
              referencedColumnNames: ["id"],
              referencedTableName: "members",
              onDelete: "CASCADE",
          }),
        )

        await queryRunner.createForeignKey(
          "tickets",
          new TableForeignKey({
              columnNames: ["assign"],
              referencedColumnNames: ["id"],
              referencedTableName: "joins",
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
    // await queryRunner.query(`DROP TABLE \`members\``);

    const table = await queryRunner.getTable("joins")
        const fk_join = table.foreignKeys.find(
            (fk) => fk.columnNames.indexOf("member_id") !== -1,
        )
        const fk_project = table.foreignKeys.find(
          (fk) => fk.columnNames.indexOf("project_id") !== -1,
        )
        const fk_tickket = table.foreignKeys.find(
          (fk) => fk.columnNames.indexOf("project_id") !== -1,
        )
        await queryRunner.dropForeignKey("joins", fk_join)
        await queryRunner.dropColumn("joins", "member_id")
        await queryRunner.dropForeignKey("joins", fk_project)
        await queryRunner.dropColumn("joins", "project_id")
        await queryRunner.dropTable("joins")
        await queryRunner.dropTable("members")
        await queryRunner.dropTable("projects")
        await queryRunner.dropForeignKey("ticketsx", fk_tickket)
        await queryRunner.dropColumn("joins", "id")
        await queryRunner.dropTable("tickets")
  }
}
