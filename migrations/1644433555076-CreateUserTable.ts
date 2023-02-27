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
