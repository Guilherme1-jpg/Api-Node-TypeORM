import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class CreateOders1654520772835 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
                name: 'orders',
                columns: [
                    {
                        name: 'id',
                        type: 'uuid',
                        isPrimary: true,
                        generationStrategy: 'uuid',
                        default: 'uuid_generate_v4()',
                    },

                    {
                        name: 'create_at',
                        type: 'timestamp with time zone',
                        default: 'now()',
                    },

                    {
                        name: 'update_at',
                        type: 'timestamp with time zone',
                        default: 'now()',
                    },
                ]
            })
        )
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable('orders')
    }

}
