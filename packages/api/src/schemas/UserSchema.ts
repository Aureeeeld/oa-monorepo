import { Field, ID, ObjectType } from "type-graphql";

@ObjectType()
export default class UserSchema {
  @Field(type => ID)
  id: number;

  @Field()
  username: string;

  @Field()
  avatar: string;

  @Field()
  discordId: string;
}
