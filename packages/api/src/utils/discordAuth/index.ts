import { Profile } from "passport-discord";

import { User, UserToken } from "../../entities";

export const saveUserInDB = async (
  accessToken: string,
  refreshToken: string,
  profile: Profile
) => {
  const { id, avatar, username } = profile;

  // ? User
  // * Get User
  let user: User | undefined = await User.findOne({ where: { userId: id } });
  // * If it's not already in the db, create it
  if (!user) {
    user = new User();
    user.discordId = id;
    user.username = username;
  }
  // * Update the avatar
  user.avatar = avatar;

  // * Save it
  await user.save();

  // ? User token
  // * Get user token
  let userToken: UserToken | undefined = await UserToken.findOne({
    where: { user }
  });
  // * If it's not already in the db, create it
  if (!userToken) {
    userToken = new UserToken();
    userToken.user = user;
  }
  // * Update token with new values
  userToken.accessToken = accessToken;
  userToken.refreshToken = refreshToken;

  // * Save it
  await userToken.save();
};
