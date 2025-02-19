import { MigrationInterface, QueryRunner, TableColumn } from 'typeorm';

export class AddPhoneNumberToUser1739953097967 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.addColumn(
      'users',
      new TableColumn({
        name: 'phoneNumber',
        type: 'varchar',
        length: '15',
        isNullable: true,
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropColumn('users', 'phoneNumber');
  }
}
