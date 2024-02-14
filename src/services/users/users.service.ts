//  TODO: Refactor user controllers code here...

import { JwtTokenType } from "@/constants";
import { BUCKET_URL } from "@/constants/storage.constant";
import { IUser } from "@/models/User.model";
import { CustomError } from "@/utils";
import { Request } from "express";
import { User } from "../../models";

class UserRepository {
  private model = User;

  async getUserById(_id: string) {
    return await User.findById(_id);
  }

  async createUser(newUser: Partial<IUser>) {
    const user = await User.create(newUser);
    await user.save();

    const obsuredUser: any = user.toJSON();

    return obsuredUser;
  }

  async loginUser({ password, email }: { password: string; email: string }) {
    const user = await User.findOne({ email });
    // catch the error b4 it actually happens
    if (!user) throw new CustomError("Please Provide valid credentials!", 401);

    // verification wall!!!!!
    // if we are here --- that means that the user is available.... so lets check for verification
    if (user.isAccountVerified !== true)
      throw new CustomError("Please verify your account b4 you login", 401); // this is a custom one for login...

    try {
      const userDetails = await User.login("email", email, password);
      return userDetails;
    } catch (e: any) {
      throw new CustomError(e.message, 401);
    }
  }

  async logoutUser(req: Request) {
    if (req.query.all) {
      req.user.tokens = req.user.tokens?.filter(
        (token: any) => token.accessToken === req.token
      );
      await req.user.save();
    } else {
      req.user.tokens = req.user.tokens?.filter(
        (token: any) => token.accessToken !== req.token
      );
      await req.user.save();
    }

    return req.user;
  }

  async updateUser(id: string, updates: Partial<IUser>) {
    return await User.findByIdAndUpdate(id, updates, {
      new: true,
    });
  }

  async deleteUser(req: Request) {
    await req.user.remove();
  }

  async refreshUserByToken(req: Request) {
    try {
      const { type, _id }: any = req.decodedToken;
      const token = req.query?.token;

      const user = await User.findOne({
        _id,
        "tokens.refreshToken": token,
      });

      if (!user) throw new CustomError("Please provide a valid token", 403);

      if (type !== JwtTokenType.refresh)
        throw new CustomError("Please provide a valid token", 403);

      await user.logout(token, "refreshToken");
      const refreshedUser = await user.refreshAuthToken();

      return refreshedUser;
    } catch (e: any) {
      if (e.name === "TokenExpiredError")
        throw new CustomError("Your token has expired, pls login again", 403);

      throw new CustomError("Unable to refresh, try again later!", 403);
    }
  }

  async uploadUserProfilePic(user, filename) {
    user.profilePic = `${BUCKET_URL}/${filename}`;
    await user.save();
    return user;
  }
}

const UserService = new UserRepository();
export default UserService;
