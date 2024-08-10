import { Injectable } from '@nestjs/common';
import {
  ValidationArguments,
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from 'class-validator';
import { EntityManager } from 'typeorm';

@ValidatorConstraint({ name: 'Unique', async: true })
@Injectable()
export class UniqueConstraint implements ValidatorConstraintInterface {
  constructor(private readonly entityManager: EntityManager) {}

  async validate(value: any, args: ValidationArguments) {
    const [entityClass, property] = args.constraints;

    const found = await this.entityManager.findOne(entityClass, {
      where: { [property]: value },
    });

    return !found;
  }

  defaultMessage(args: ValidationArguments) {
    return `${args.value} já está em uso.`;
  }
}
