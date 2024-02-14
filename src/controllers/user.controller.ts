import respond from "../utils/respond";

import UserService from "@/services/users/users.service";
import { catchAsync } from "../utils/errors";

//:id
export const getUserById = catchAsync(async (req: any, res: any) => {
  // const isExtended = req.query?.extended == 'true' ? true : false
  const id = req.params.id;
  let user = await UserService.getUserById(id);
  // ?extended=true
  if (!user) return respond(res, 404, "user not found!");
  respond(res, 200, "Fetched user data", user);
});

export const getUserProfile = async (req: any, res: any) => {
  const user = req.user;
  respond(res, 200, "Fetched user profile", user);
};

// /POST /signup
export const signupUser = catchAsync(async (req: any, res: any) => {
  const newUser = {
    ...req.body,
    isAccountVerified: true,
  };

  const user = await UserService.createUser(newUser);
  respond(res, 201, "Succesfully registered", user);
});

// /POST /login
// only by email
export const loginUser = catchAsync(async (req, res) => {
  const { password, email } = req.body;
  const user = await UserService.loginUser({ password, email });
  return respond(res, 200, "Succesfully signed in", user);
});

// /?all=true
export const logoutUser = catchAsync(async (req, res) => {
  await UserService.logoutUser(req);
  respond(res, 200, "Succesfully logged out user!");
});

// Put /
export const updateUser = catchAsync(async (req, res) => {
  try {
    const updates = req.body;
    const user = req.user;

    // delete subStatus
    if (updates?.subStatus) delete updates?.subStatus;

    if (Object.keys(req.body).length === 0)
      return respond(res, 200, "Nothing to do here!");

    const updatedUser = await UserService.updateUser(user._id, updates);
    respond(res, 200, "succesfully updated the user", updatedUser);
  } catch (e) {
    res.status(500).send(e);
  }
});

// /DELETE /
export const deleteUser = async (req: any, res: any) => {
  try {
    await UserService.deleteUser(req);
    respond(res, 200, "Successfully deleted user");
  } catch (e) {
    respond(res, 500, "Something went wrong!, try again later");
  }
};

// users/auth/refresh?token={refreshToken}
export const refreshUserByToken = async (req, res) => {
  const refreshedUser = await UserService.refreshUserByToken(req);
  respond(res, 200, "successfully refreshed your token!", refreshedUser);
};

// profilePic
export const uploadUserprofilePic = catchAsync(async (req, res) => {
  if (!req.file) return respond(res, 400, "pls provide an image file");
  const filename = req.file?.filename;

  const user = await UserService.uploadUserProfilePic(req.user, filename);
  respond(res, 200, "successfully updated user profilePic", user);
});
