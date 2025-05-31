// src/application/dto/transaction-filter.input.ts

import { IsEnum, IsOptional, IsUUID } from 'class-validator';
import { TransactionStatus } from 'src/domain/entities/transaction-status.enum';
import { TransactionMethod } from 'src/domain/entities/transaction-method.enum';
import { InputType, Field, ID } from '@nestjs/graphql';

@InputType()
export class TransactionFilterInput {
  @Field(() => ID, { nullable: true })
  @IsOptional()
  @IsUUID()
  userId?: string;

  @Field(() => TransactionStatus, { nullable: true })
  @IsOptional()
  @IsEnum(TransactionStatus)
  status?: TransactionStatus;

  @Field(() => TransactionMethod, { nullable: true })
  @IsOptional()
  @IsEnum(TransactionMethod)
  method?: TransactionMethod;
}
