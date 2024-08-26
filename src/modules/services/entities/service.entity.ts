import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'service' })
export class Service {
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
    name: 'description',
    type: 'varchar',
    length: 500,
    nullable: true,
  })
  description?: string;

  @Column({
    type: 'double',
    name: 'recommended_price',
  })
  recommendedPrice: number;

  @Column({
    type: 'int',
    name: 'provider_id',
  })
  providerId: number;

  constructor(service?: Partial<Service>) {
    this.id = service?.id;
    this.name = service?.name;
    this.description = service?.description;
    this.recommendedPrice = service?.recommendedPrice;
    this.providerId = service?.providerId;
  }
}
