import mongoose from "mongoose";

interface IProfile {
  _id: mongoose.Types.ObjectId;
  id?: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  password: string; // will be hidden
  profilePic: string;
  location: string;
  // isAdmin: boolean,
  isAccountVerified: boolean;

  birthDate: string;
  accountType: string;
  workType: string;

  role: string;
  interests: Interest[];

  noticedInterests: Interest[];
  homeAreas: HomeArea[];
}

interface Interest {
  interest: string;
}

interface HomeArea {
  area: string;
}

// export interface UserProps extends IProfile {
//         followers?: FollowerType[],
//         following?: FollowerType[],
//         followersCount?: number,
//         followingCount?: number,
// }
