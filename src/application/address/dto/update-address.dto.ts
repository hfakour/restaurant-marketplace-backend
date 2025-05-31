// src/application/dto/update-address.dto.ts

import { InputType, PartialType } from '@nestjs/graphql';
import { CreateAddressDto } from './create-address.dto';

@InputType()
export class UpdateAddressDto extends PartialType(CreateAddressDto) {}
