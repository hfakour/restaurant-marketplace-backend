import { Embeddable, Property } from '@mikro-orm/core';
import { ObjectType, Field, Float } from '@nestjs/graphql';

@Embeddable()
@ObjectType()
export class ExtraOption {
  @Field()
  @Property()
  name: string;

  @Field(() => Float)
  @Property()
  additionalPrice: number;
}
