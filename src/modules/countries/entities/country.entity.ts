import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity({ name: 'country' })
export class Country {
  @PrimaryGeneratedColumn({
    name: 'id',
    type: 'int',
  })
  id: number;

  @Column({
    name: 'name',
    type: 'varchar',
    length: 300,
    unique: true,
  })
  name: string;

  @Column({
    name: 'isocode',
    type: 'varchar',
    length: 10,
    nullable: true,
  })
  isocode?: string;

  @Column({
    name: 'phonecode',
    type: 'varchar',
    length: 50,
    nullable: true,
  })
  phonecode?: string;

  constructor(country?: Partial<Country>) {
    this.id = country?.id;
    this.name = country?.name;
    this.isocode = country?.isocode;
    this.phonecode = country?.phonecode;
  }
}
