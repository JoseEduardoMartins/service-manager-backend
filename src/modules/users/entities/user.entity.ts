import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity({
  name: 'user',
  orderBy: {
    id: 'ASC',
  },
  engine: 'InnoDB',
  synchronize: true,
})
export class User {
  @PrimaryGeneratedColumn({
    type: 'int',
    name: 'id',
  })
  id: number;

  @Column({
    type: 'varchar',
    name: 'name',
    length: 300,
  })
  name: string;

  @Column({
    type: 'date',
    name: 'birthdate',
  })
  birthdate: Date;

  @Column({
    type: 'varchar',
    name: 'phone',
    length: 50,
    unique: true,
  })
  phone: string;

  @Column({
    type: 'varchar',
    name: 'photo',
    length: 300,
    nullable: true,
  })
  photo?: string;

  @Column({
    type: 'varchar',
    name: 'email',
    length: 300,
    unique: true,
  })
  email: string;

  @Column({
    type: 'varchar',
    name: 'password',
    length: 300,
  })
  password: string;

  @Column({
    type: 'varchar',
    name: 'security_code',
    length: 6,
    nullable: true,
  })
  securityCode?: string;

  @Column({
    type: 'boolean',
    name: 'is_actived',
    default: true,
  })
  isActived: boolean;

  @Column({
    type: 'boolean',
    name: 'is_verified',
    default: false,
  })
  isVerified: boolean;

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
    name: 'updated_at',
  })
  updatedAt: Date;

  @Column({
    type: 'datetime',
    name: 'deleted_at',
    nullable: true,
  })
  deletedAt?: Date;

  @Column({
    type: 'int',
    name: 'address_id',
    nullable: true,
  })
  addressId?: number;

  constructor(user?: Partial<User>) {
    this.id = user?.id;
    this.name = user?.name;
    this.birthdate = user?.birthdate;
    this.photo = user?.photo;
    this.phone = user?.phone;
    this.email = user?.email;
    this.password = user?.password;
    this.securityCode = user?.securityCode;
    this.isActived = user?.isActived;
    this.isVerified = user?.isVerified;
    this.isDeleted = user?.isDeleted;
    this.createdAt = user?.createdAt;
    this.updatedAt = user?.updatedAt;
    this.deletedAt = user?.deletedAt;
    this.addressId = user?.addressId;
  }
}
