// src/application/admin/dto/update-admin.dto.ts

import { InputType, PartialType } from '@nestjs/graphql';
import { CreateAdminDto } from './create-admin.dto';

@InputType()
export class UpdateAdminDto extends PartialType(CreateAdminDto) {}
