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
    type: 'boolean',
    name: 'is_actived',
    default: true,
  })
  isActived: boolean;

  @Column({
    type: 'boolean',
    name: 'is_deleted',
    default: false,
  })
  isDeleted: boolean;

  @Column({
    type: 'datetime',
    name: 'created_at',
  })
  createdAt: Date;

  @Column({
    type: 'datetime',
    name: 'deleted_at',
    nullable: true,
  })
  deletedAt?: Date;

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
    this.isActived = service?.isActived;
    this.isDeleted = service?.isDeleted;
    this.createdAt = service?.createdAt;
    this.deletedAt = service?.deletedAt;
    this.providerId = service?.providerId;
  }
}
