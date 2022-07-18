export type TUser = {
  email: string;
  name: string;
};

export type TUserAuth = {
  email: string;
  password: string;
};

export type TUserFull = TUser & TUserAuth;
