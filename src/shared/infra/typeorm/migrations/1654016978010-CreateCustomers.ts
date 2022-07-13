import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class CreateCustomers1654016978010 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
                name: 'customers',
                columns: [
                    {
                        name: 'id',
                        type: 'uuid',
                        isPrimary: true,
                        generationStrategy: 'uuid',
                        default: 'uuid_generate_v4()',
                    },
                    {
                        name: 'name',
                        type: 'varchar'
                    },
                    {
                        name: 'email',
                        type: 'varchar',
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
        await queryRunner.dropTable('customers')
    }

}
