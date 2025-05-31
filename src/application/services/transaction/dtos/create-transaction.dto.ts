// src/application/dto/create-transaction.dto.ts

import { IsUUID, IsNumber, IsEnum, IsOptional } from 'class-validator';
import { TransactionStatus } from 'src/domain/entities/transaction-status.enum';
import { TransactionMethod } from 'src/domain/entities/transaction-method.enum';
import { InputType, Field, Float, ID } from '@nestjs/graphql';

@InputType()
export class CreateTransactionDto {
  @Field(() => ID)
  @IsUUID()
  userId: string;

  @Field(() => ID, { nullable: true })
  @IsOptional()
  @IsUUID()
  orderId?: string;

  @Field(() => Float)
  @IsNumber()
  amount: number;

  @Field(() => TransactionStatus, { nullable: true })
  @IsEnum(TransactionStatus)
  status: TransactionStatus;

  @Field(() => TransactionMethod)
  @IsEnum(TransactionMethod)
  method: TransactionMethod;
}
