import { Field, ObjectType } from "type-graphql";

@ObjectType()
export default class UserProfileInformationSchema {
  @Field()
  username: string;

  @Field({ nullable: true })
  avatar: string;
}
