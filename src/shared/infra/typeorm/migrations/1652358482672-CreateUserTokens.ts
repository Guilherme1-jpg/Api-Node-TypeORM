import {MigrationInterface, QueryRunner, Table} from "typeorm";

export class CreateUserTokens1652358482672 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        new Table({
            name: 'user_tokens',
            columns: [
                {
                    name: 'id',
                    type: 'uuid',
                    isPrimary: true,
                    generationStrategy: 'uuid',
                    default: 'uuid_generate_v4()',
                },
                {
                    name: 'token',
                    type: 'uuid',
                    generationStrategy: 'uuid',
                    default: 'uuid_generate_v4()',
                },
                {
                    name:'user_id',
                    type:'uuid',
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
            ],
            foreignKeys:[
                {
                    name:'TokenUser',
                    referencedTableName: 'users',
                    referencedColumnNames: ['id'],
                    columnNames:[
                        'user_id'
                    ],
                    onDelete:'CASCADE',
                    onUpdate:'CASCADE',
                }
            ]
        })
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable('user_tokens');
    }

}
