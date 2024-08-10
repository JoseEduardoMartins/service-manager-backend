import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'receiver' })
export class Receiver {
  @PrimaryGeneratedColumn({
    name: 'id',
    type: 'int',
  })
  id: number;

  @Column({
    name: 'user_id',
    type: 'int',
    unique: true,
  })
  userId: number;

  @Column({
    name: 'tax_id',
    type: 'varchar',
    length: 11,
    unique: true,
  })
  taxId: string;

  constructor(receiver?: Partial<Receiver>) {
    this.id = receiver?.id;
    this.userId = receiver?.userId;
    this.taxId = receiver?.taxId;
  }
}
