
import {MigrationInterface, QueryRunner, Table} from "typeorm";

export class CreateProducts1650285671484 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(new Table({
            name: 'products',
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
                    type: 'varchar',
                },
                {
                    name: 'price',
                    type: 'decimal',
                    precision: 10,
                    scale: 2,
                },
                {
                    name: 'quantity',
                    type: 'int',
                },
                {
                    name:'create_at',
                    type: 'timestamp with time zone',
                    default: 'now()',
                },

                {
                    name:'update_at',
                    type: 'timestamp with time zone',
                    default: 'now()',
                },

            ]
        }))
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable('products')
    }

}
