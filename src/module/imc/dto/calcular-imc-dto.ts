import { IsNumber, Min, Max } from 'class-validator';
import { IsNotEmpty } from 'class-validator';
import { Validate } from 'class-validator';
import { ValidatorConstraint, ValidatorConstraintInterface, ValidationArguments } from 'class-validator';

@ValidatorConstraint({ name: 'maxTwoDecimals', async: false })
export class MaxTwoDecimalsConstraint implements ValidatorConstraintInterface {
  validate(value: number, args: ValidationArguments) {
    if (typeof value !== 'number') return false;
    return /^\d+(\.\d{1,2})?$/.test(value.toString());
  }
  defaultMessage(args: ValidationArguments) {
    return `${args.property} debe tener como máximo 2 decimales`;
  }
}

export class CalcularImcDto {
  @IsNotEmpty({ message: 'La altura es obligatoria' })
  @IsNumber()
  @Min(0.01, { message: 'La altura debe ser mayor a 0' })
  @Max(3, { message: 'La altura debe ser menor a 3 metros' })
  @Validate(MaxTwoDecimalsConstraint)
  altura: number;

  @IsNotEmpty({ message: 'El peso es obligatorio' })
  @IsNumber()
  @Min(1, { message: 'El peso debe ser mayor o igual a 1 kg' })
  @Max(500, { message: 'El peso debe ser menor o igual a 500 kg' })
  @Validate(MaxTwoDecimalsConstraint)
  peso: number;
}
