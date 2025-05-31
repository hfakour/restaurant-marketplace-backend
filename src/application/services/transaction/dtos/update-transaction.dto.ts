// src/application/dto/update-transaction.dto.ts

import { IsUUID, IsNumber, IsEnum, IsOptional } from 'class-validator';
import { TransactionStatus } from 'src/domain/entities/transaction-status.enum';
import { TransactionMethod } from 'src/domain/entities/transaction-method.enum';
import { InputType, Field, Float, ID } from '@nestjs/graphql';

@InputType()
export class UpdateTransactionDto {
  @Field(() => ID, { nullable: true })
  @IsOptional()
  @IsUUID()
  userId?: string;

  @Field(() => ID, { nullable: true })
  @IsOptional()
  @IsUUID()
  orderId?: string;

  @Field(() => Float, { nullable: true })
  @IsOptional()
  @IsNumber()
  amount?: number;

  @Field(() => TransactionStatus, { nullable: true })
  @IsOptional()
  @IsEnum(TransactionStatus)
  status?: TransactionStatus;

  @Field(() => TransactionMethod, { nullable: true })
  @IsOptional()
  @IsEnum(TransactionMethod)
  method?: TransactionMethod;
}
