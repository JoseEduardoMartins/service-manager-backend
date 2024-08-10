import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'sector' })
export class Sector {
  @PrimaryGeneratedColumn({
    name: 'id',
    type: 'int',
  })
  id: number;

  @Column({
    name: 'label',
    type: 'varchar',
    length: 300,
  })
  label: string;

  constructor(sector?: Partial<Sector>) {
    this.id = sector?.id;
    this.label = sector?.label;
  }
}
