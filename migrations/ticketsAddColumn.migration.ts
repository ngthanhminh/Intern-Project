import {
    MigrationInterface, 
    QueryRunner,
    TableColumn,
} from "typeorm";

export class addColumnTicket1677469921988 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.addColumn(
            "tickets",
            new TableColumn({
                name: "status",
                type: "enum('TODO', 'INPROGRESS', 'DONE')",
            }),
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropColumn('tickets', 'status');
    }

}
