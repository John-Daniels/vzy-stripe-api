import express from "express";
import { User } from "../models";

//controllers
import {
  deleteUser,
  getUserById,
  getUserProfile,
  loginUser,
  logoutUser,
  refreshUserByToken,
  signupUser,
  updateUser,
  uploadUserprofilePic,
} from "../controllers/user.controller";
import {
  verifyAuthStateByTokenQuery,
  verifyAuthToken,
} from "../middlewares/auth.middleware";

//validators
import {
  validateLogin,
  validateSignup,
  validateUpdateUser,
} from "../utils/validators/user.validator";
import { useUploadprofilePic } from "@/services/uploads";

const router = express.Router();

// just for test...
router.get("/", async (req: any, res: any) => {
  const users = await User.find();
  res.send(users);
});

// signup model
// signup  --> verication --> login  --> authenication
//                 validate --> checkforerrors --> nextfunc
router.post("/signup", validateSignup, signupUser);
// POST /login?by=email
router.post("/login", validateLogin, loginUser);

// refresh auth token when it has expired
router.post("/auth/refresh", verifyAuthStateByTokenQuery, refreshUserByToken);

// authenticated area
router.use(verifyAuthToken);

router.get("/profile", getUserProfile);

router.get("/:id", getUserById);

// POST /logout?all=true
router.post("/logout", logoutUser);

router.route("/").put(validateUpdateUser, updateUser).delete(deleteUser);
router.post("/avatars", useUploadprofilePic, uploadUserprofilePic);

export default router;
