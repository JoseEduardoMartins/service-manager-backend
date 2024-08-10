import { registerDecorator, ValidationOptions } from 'class-validator';
import { ObjectType } from 'typeorm';
import { ExistConstraint } from './is-exist.validator';

export function Exist(
  entity: ObjectType<any>,
  property: string,
  validationOptions?: ValidationOptions,
) {
  return function (object: object, propertyName: string) {
    registerDecorator({
      name: 'Exist',
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      constraints: [entity, property],
      validator: ExistConstraint,
      async: true,
    });
  };
}
