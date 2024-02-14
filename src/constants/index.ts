/**
 * JwtType is a constant which helps to keep the state of our tokens.
 */
export enum JwtTokenType {
  auth = "user_auth",
  refresh = "user_refresh",
  verification = "user_verification",
  passwordReset = "pass_reset",
}

export enum NODE_ENV {
  dev = "development",
  prod = "production",
}
