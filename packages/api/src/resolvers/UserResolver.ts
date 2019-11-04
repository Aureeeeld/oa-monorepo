import { Authorized, Query, Mutation, Resolver, Arg } from "type-graphql";

import { User } from "../entities/User";
import UserSchema from "../schemas/UserSchema";

@Resolver(of => UserSchema)
export default class {
  @Authorized()
  @Query(returns => [UserSchema])
  users() {
    return User.find();
  }

  @Authorized()
  @Mutation(returns => UserSchema)
  async createUser(@Arg("name") name: string): Promise<User> {
    const user = new User();
    user.name = name;
    return user.save();
  }
}