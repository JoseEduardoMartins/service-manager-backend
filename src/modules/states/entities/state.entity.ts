import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'state' })
export class State {
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
    name: 'short_name',
    type: 'varchar',
    length: 10,
    nullable: true,
  })
  shortName?: string;

  @Column({
    name: 'country_id',
    type: 'int',
  })
  countryId: number;

  constructor(state?: Partial<State>) {
    this.id = state?.id;
    this.name = state?.name;
    this.shortName = state?.shortName;
    this.countryId = state?.countryId;
  }
}
