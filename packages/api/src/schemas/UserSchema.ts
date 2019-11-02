import { Field, ID, ObjectType } from "type-graphql";

@ObjectType()
export default class UserSchema {
  @Field(type => ID)
  id: number;

  @Field()
  name: string;
}
