import { UserInputError, ApolloError } from "apollo-server-express";
import { Authorized, Query, Mutation, Resolver, Arg } from "type-graphql";

// * Entities
import { User } from "../entities";

// * Schemas
import { UserSchema, UserProfileInformationSchema } from "../schemas";

// * Resolvers
@Resolver(of => UserSchema)
export default class {
  @Authorized()
  @Query(returns => [UserSchema])
  users() {
    return User.find();
  }

  @Authorized()
  @Query(returns => UserProfileInformationSchema)
  async userProfileInformation(@Arg("id") id: string) {
    const user = await User.findOne({ where: { discordId: id } });
    if (!user) throw new UserInputError("User cannot be found");

    const { username, avatar } = user;
    const profile: UserProfileInformationSchema = {
      username,
      avatar: avatar
        ? `https://cdn.discordapp.com/avatars/${user.discordId}/${user.avatar}.png?size=64`
        : avatar
    };

    return profile;
  }
}
