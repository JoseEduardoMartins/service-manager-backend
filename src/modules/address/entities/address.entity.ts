import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class Address {
  @PrimaryGeneratedColumn({
    name: 'id',
    type: 'int',
  })
  id: number;

  @Column({
    name: 'street',
    type: 'varchar',
    length: 300,
  })
  street: string;

  @Column({
    name: 'complement',
    type: 'varchar',
    length: 300,
    nullable: true,
  })
  complement?: string;

  @Column({
    name: 'number',
    type: 'int',
    nullable: true,
  })
  number?: number;

  @Column({
    name: 'zipcode',
    type: 'varchar',
    length: 50,
  })
  zipcode: string;

  @Column({
    name: 'country_id',
    type: 'int',
  })
  countryId: number;

  @Column({
    name: 'state_id',
    type: 'int',
  })
  stateId: number;

  @Column({
    name: 'city_id',
    type: 'int',
  })
  cityId: number;

  constructor(address?: Partial<Address>) {
    this.id = address?.id;
    this.street = address?.street;
    this.complement = address?.complement;
    this.number = address?.number;
    this.zipcode = address?.zipcode;
    this.countryId = address?.countryId;
    this.stateId = address?.stateId;
    this.cityId = address?.cityId;
  }
}
