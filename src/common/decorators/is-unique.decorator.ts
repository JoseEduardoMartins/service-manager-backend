import { registerDecorator, ValidationOptions } from 'class-validator';
import { ObjectType } from 'typeorm';
import { UniqueConstraint } from './is-unique.validator';

export function Unique(
  entity: ObjectType<any>,
  property: string,
  validationOptions?: ValidationOptions,
) {
  return function (object: object, propertyName: string) {
    registerDecorator({
      name: 'Unique',
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      constraints: [entity, property],
      validator: UniqueConstraint,
      async: true,
    });
  };
}
