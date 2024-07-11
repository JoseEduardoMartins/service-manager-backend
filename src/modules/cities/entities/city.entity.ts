import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'city' })
export class City {
  @PrimaryGeneratedColumn({
    name: 'id',
    type: 'int',
  })
  id: number;

  @Column({
    name: 'name',
    type: 'varchar',
    length: 300,
  })
  name: string;

  @Column({
    name: 'state_id',
    type: 'int',
  })
  stateId: number;

  constructor(city?: Partial<City>) {
    this.id = city?.id;
    this.name = city?.name;
    this.stateId = city?.stateId;
  }
}
