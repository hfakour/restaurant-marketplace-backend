import { Embeddable, Property } from "@mikro-orm/core";
import { ObjectType, Field } from "@nestjs/graphql";

@Embeddable()
@ObjectType()
export class CustomizationOption {
  @Field()
  @Property()
  name: string;

  @Field()
  @Property()
  value: string;
}
