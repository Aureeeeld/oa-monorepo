import { Authorized, Query, Mutation, Resolver, Arg } from "type-graphql";

import { User } from "../entities";
import { UserSchema } from "../schemas";

@Resolver(of => UserSchema)
export default class {
  @Authorized()
  @Query(returns => [UserSchema])
  users() {
    return User.find();
  }

  @Authorized()
  @Query(returns => String)
  async userAvatarLink(@Arg("id") id: string) {
    const user = await User.findOne({ where: { discordId: id } });
    if (!user) return undefined;
    return `https://cdn.discordapp.com/avatars/${user.discordId}/${user.avatar}.png`;
  }
}
