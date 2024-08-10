import {
  ValidatorConstraint,
  ValidatorConstraintInterface,
  ValidationArguments,
} from 'class-validator';
import { Injectable } from '@nestjs/common';
import { EntityManager } from 'typeorm';

@ValidatorConstraint({ name: 'Exist', async: true })
@Injectable()
export class ExistConstraint implements ValidatorConstraintInterface {
  constructor(private readonly entityManager: EntityManager) {}

  async validate(value: any, args: ValidationArguments) {
    const [entityClass, property] = args.constraints;

    const found = await this.entityManager.findOne(entityClass, {
      where: { [property]: value },
    });

    return !!found;
  }

  defaultMessage(args: ValidationArguments) {
    return `{ ${args.property}: ${args.value} } não existe no sistema.`;
  }
}
