import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'provider' })
export class Provider {
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
    length: 14,
    unique: true,
  })
  taxId: string;

  @Column({
    name: 'description',
    type: 'varchar',
    length: 1000,
    nullable: true,
  })
  description?: string;

  @Column({
    name: 'linkedin_link',
    type: 'varchar',
    length: 300,
    nullable: true,
  })
  linkedinLink?: string;

  @Column({
    name: 'instagram_link',
    type: 'varchar',
    length: 300,
    nullable: true,
  })
  instagramLink?: string;

  @Column({
    name: 'facebook_link',
    type: 'varchar',
    length: 300,
    nullable: true,
  })
  facebookLink?: string;

  @Column({
    name: 'homepage_link',
    type: 'varchar',
    length: 300,
    nullable: true,
  })
  homepageLink?: string;

  @Column({
    name: 'sector_id',
    type: 'int',
    nullable: true,
  })
  sectorId?: number;

  constructor(city?: Partial<Provider>) {
    this.id = city?.id;
    this.taxId = city?.taxId;
    this.description = city?.description;
    this.linkedinLink = city?.linkedinLink;
    this.instagramLink = city?.instagramLink;
    this.facebookLink = city?.facebookLink;
    this.homepageLink = city?.homepageLink;
    this.sectorId = city?.sectorId;
  }
}
